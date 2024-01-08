package com.advancedprogramming.api.services;

import com.advancedprogramming.api.config.JwtService;
import com.advancedprogramming.api.controllers.beans.AuthenticationRequest;
import com.advancedprogramming.api.controllers.beans.AuthenticationResponse;
import com.advancedprogramming.api.controllers.beans.RegisterRequest;
import com.advancedprogramming.api.models.Token;
import com.advancedprogramming.api.models.TokenRepository;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import com.advancedprogramming.api.models.token.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        // check if email is already registered
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .role("ROLE_USER")
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .build();
        Map<String, Object> extraClaims = Map.of("role", user.getRole(), "email", user.getEmail());
        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(user, extraClaims);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow();
        Map<String, Object> extraClaims = Map.of("role", user.getRole(), "email", user.getEmail());
        String jwtToken = jwtService.generateToken(user, extraClaims);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .build();
    }

    public AuthenticationResponse getMe(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authHeader.substring(7);
        Boolean isTokenValid = tokenRepository.findByToken(token)
            .map(t -> !t.isExpired() && !t.isRevoked())
            .orElse(false);

        String email = jwtService.extractEmail(token);
        User user = userRepository.findByEmail(email).orElseThrow();
        if (!isTokenValid && jwtService.isTokenValid(token, user)) {
            revokeAllUserTokens(user);
            return null;
        }
        return AuthenticationResponse.builder()
            .accessToken(token)
            .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
