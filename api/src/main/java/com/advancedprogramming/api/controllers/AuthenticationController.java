package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.config.LogoutService;
import com.advancedprogramming.api.controllers.beans.AuthenticationRequest;
import com.advancedprogramming.api.controllers.beans.AuthenticationResponse;
import com.advancedprogramming.api.controllers.beans.RegisterRequest;
import com.advancedprogramming.api.models.Promotion;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.AuthenticationService;
import com.advancedprogramming.api.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@Tag(name = "User Authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    private final LogoutService logoutService;
    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User registered successfully", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "400", description = "Bad request")
    })
    public ResponseEntity<AuthenticationResponse> register(
        @Valid @RequestBody RegisterRequest request
    ) throws IOException {
        return ResponseEntity.ok(authService.register(request, false));
    }

    @PostMapping("/register/tutor")
    @Operation(summary = "Register a new tutor")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Tutor registered successfully", content = @Content(mediaType = "application/json")),
        @ApiResponse(responseCode = "400", description = "Bad request")
    })
    public ResponseEntity<AuthenticationResponse> tutorRegistration(
        @Valid @RequestBody RegisterRequest bodyRequest,
        HttpServletRequest headerRequest
    ) throws IOException {
        User user = userService.getUserByFromRequest(headerRequest);
        if (user == null || !RoleEnum.ADMIN.equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.ok(authService.register(bodyRequest, true));
    }

    @GetMapping("/promotions")
    @Operation(summary = "Get a list of available promotions")
    public ResponseEntity<List<Promotion>> getPromotions() {
        return ResponseEntity.ok(authService.getPromotions());
    }

    @Operation(summary = "Authenticate a user")
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @Operation(summary = "Logout a user")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
        HttpServletRequest request,
        HttpServletResponse response
    ) {
        logoutService.logout(request, response, null);
        return ResponseEntity.ok().build();
    }
}
