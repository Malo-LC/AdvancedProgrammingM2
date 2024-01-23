package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.AuthenticationResponse;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import com.advancedprogramming.api.services.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/user")
@RequiredArgsConstructor
@Tag(name = "User")
@CrossOrigin(origins = "*")
public class UserController {
    private final UserRepository userRepository;
    private final AuthenticationService authService;

    @Operation(summary = "Get all users")
    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Operation(summary = "Get current user")
    @GetMapping(path = "/me")
    public @ResponseBody AuthenticationResponse getMe(HttpServletRequest request) {
        return authService.getMe(request);
    }
}
