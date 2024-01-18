package com.advancedprogramming.api.controllers;

import com.advancedprogramming.api.controllers.beans.AuthenticationRequest;
import com.advancedprogramming.api.controllers.beans.AuthenticationResponse;
import com.advancedprogramming.api.controllers.beans.RegisterRequest;
import com.advancedprogramming.api.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
        @Valid @RequestBody RegisterRequest request
    ) throws IOException {
        if (request.profilePicture() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
        @RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
