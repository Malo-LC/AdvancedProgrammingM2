package com.advancedprogramming.api.services;

import com.advancedprogramming.api.config.JwtService;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.bean.UserShort;
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

    public List<UserShort> getAllUsers() {
        return userRepository.findAll()
            .stream()
            .map(user -> new UserShort(user.getId(), user.getFirstName(), user.getLastName()))
            .toList();
    }

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
        List<User> users = userRepository.findAll();
        return users.stream().collect(Collectors.toMap(User::getId, user -> user));
    }

    public List<UserShort> getAllTutors() {
        return userRepository.findAll().stream()
            .filter(user -> RoleEnum.TUTOR.equals(user.getRole()))
            .map(user -> new UserShort(user.getId(), user.getFirstName(), user.getLastName()))
            .toList();
    }
}
