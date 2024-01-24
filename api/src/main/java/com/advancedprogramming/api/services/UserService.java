package com.advancedprogramming.api.services;

import com.advancedprogramming.api.config.JwtService;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public User getUserByToken(String token) {
        String userEmail = jwtService.extractEmail(token);
        return userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        return authHeader.substring(7);
    }

    public User getUserByFromRequest(HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        return getUserByToken(token);
    }

    public Map<Integer, User> getUserById() {
        List<User> users = (List<User>) userRepository.findAll();
        return users.stream().collect(Collectors.toMap(User::getId, user -> user));
    }
}
