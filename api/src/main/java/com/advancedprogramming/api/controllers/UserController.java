package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.AuthenticationResponse;
import com.advancedprogramming.api.controllers.beans.CustomFile;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import com.advancedprogramming.api.services.AuthenticationService;
import com.advancedprogramming.api.services.UserService;
import com.advancedprogramming.api.services.bean.UserShort;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping(path = "/user")
@RequiredArgsConstructor
@Tag(name = "User")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserRepository userRepository;
    private final AuthenticationService authService;
    private final UserService userService;

    @Operation(summary = "Get all users")
    @GetMapping(path = "/all")
    public @ResponseBody List<UserShort> getAllUsers() {
        return userService.getAllUsers();
    }

    @Operation(summary = "Get all users")
    @GetMapping(path = "/tutors")
    public @ResponseBody List<UserShort> getAllTutors() {
        return userService.getAllTutors();
    }

    @Operation(summary = "Update profile picture")
    @PostMapping(path = "/updateProfilePicture")
    public @ResponseBody AuthenticationResponse updateProfilePicture(@RequestBody CustomFile profilePicture, HttpServletRequest request) throws IOException {
        User user = userService.getUserByFromRequest(request);
        return authService.updateProfilePicture(profilePicture, user);
    }
}
