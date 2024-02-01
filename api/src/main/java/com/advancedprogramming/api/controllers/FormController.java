package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.MessageResponse;
import com.advancedprogramming.api.controllers.beans.StudentInternshipFormRequest;
import com.advancedprogramming.api.models.Form;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.FormService;
import com.advancedprogramming.api.services.UserService;
import com.advancedprogramming.api.services.bean.AnswerType;
import com.advancedprogramming.api.services.bean.FormRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/form")
@CrossOrigin(origins = "*")
@Tag(name = "Forms")
@RequiredArgsConstructor
public class FormController {

    private final FormService formService;
    private final UserService userService;

    @PostMapping
    @Operation(summary = "Create a form")
    public ResponseEntity<MessageResponse> createForm(@RequestBody FormRequest request, HttpServletRequest httpRequest) {
        User user = userService.getUserByFromRequest(httpRequest);
        if (!RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(403).body(new MessageResponse("You are not allowed to create a form", false));
        }

        formService.createForm(request);
        return ResponseEntity.ok().body(new MessageResponse("Form created successfully", true));
    }

    @GetMapping
    @Operation(summary = "Get all forms")
    public ResponseEntity<List<Form>> getAllForms(HttpServletRequest httpRequest) {
        User user = userService.getUserByFromRequest(httpRequest);
        if (!RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(403).body(null);
        }
        List<Form> forms = formService.getAllForms();
        return ResponseEntity.ok().body(forms);
    }

    @Operation(summary = "Get a form by id")
    @GetMapping("/{id}")
    public ResponseEntity<Form> getFormById(@PathVariable Integer id) {
        return ResponseEntity.ok().body(formService.getFormById(id));
    }

    @Operation(summary = "Delete a form by id")
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFormById(@PathVariable Integer id, HttpServletRequest httpRequest) {
        User user = userService.getUserByFromRequest(httpRequest);
        if (!RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(403).body(new MessageResponse("You are not allowed to delete a form", false));
        }
        formService.deleteFormById(id);
        return ResponseEntity.ok().body(new MessageResponse("Form deleted successfully", true));
    }

    @PostMapping("/update")
    @Operation(summary = "Update a form by id")
    public ResponseEntity<MessageResponse> updateFormById(@RequestBody FormRequest formRequest, HttpServletRequest httpRequest) {
        User user = userService.getUserByFromRequest(httpRequest);
        if (!RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(403).body(new MessageResponse("You are not allowed to update a form", false));
        }
        Boolean result = formService.updateFormById(formRequest);
        if (result) {
            return ResponseEntity.ok().body(new MessageResponse("Form updated successfully", true));
        }
        return ResponseEntity.status(404).body(new MessageResponse("Form not found or Error", false));
    }

    @PostMapping("/student-internship-form")
    public ResponseEntity<MessageResponse> createUserForm(@RequestBody StudentInternshipFormRequest request, HttpServletRequest httpRequest) {
        User user = userService.getUserByFromRequest(httpRequest);
        if (!RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(403).body(new MessageResponse("You are not allowed to create a form", false));
        }
        Boolean result = formService.createStudentInternshipForm(request);
        if (result) {
            return ResponseEntity.ok().body(new MessageResponse("Form created successfully", true));
        }
        return ResponseEntity.status(404).body(new MessageResponse("Form not found or Error", false));
    }

    @PostMapping("/answer/{studentInternshipFormId}")
    public ResponseEntity<MessageResponse> answerForm(@PathVariable Integer studentInternshipFormId, @RequestBody List<AnswerType> answers, HttpServletRequest httpRequest) {
        User user = userService.getUserByFromRequest(httpRequest);
        boolean result = formService.answerForm(studentInternshipFormId, answers, user);
        if (result) {
            return ResponseEntity.ok().body(new MessageResponse("Form answered successfully", true));
        }
        return ResponseEntity.status(404).body(new MessageResponse("Form not found or Error", false));
    }

    @PostMapping("/sign/{studentInternshipFormId}")
    public Boolean signForm(@PathVariable Integer studentInternshipFormId, HttpServletRequest httpRequest) {
        User user = userService.getUserByFromRequest(httpRequest);
        return formService.signForm(studentInternshipFormId, user);
    }
}