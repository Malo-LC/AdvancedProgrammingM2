package com.advancedprogramming.api.services;

import com.advancedprogramming.api.config.JwtService;
import com.advancedprogramming.api.controllers.beans.AuthenticationRequest;
import com.advancedprogramming.api.controllers.beans.AuthenticationResponse;
import com.advancedprogramming.api.controllers.beans.RegisterRequest;
import com.advancedprogramming.api.models.Filedb;
import com.advancedprogramming.api.models.Token;
import com.advancedprogramming.api.models.TokenRepository;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.UserRepository;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.models.token.TokenType;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final FileStorageService fileStorageService;
    private final UserService userService;

    public AuthenticationResponse register(RegisterRequest request) throws IOException {
        // check if email is already registered
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        MultipartFile profilePictureMultipart = Base64ToMultipartFileConverter.convert(
            request.profilePicture().base64(),
            request.profilePicture().type(),
            request.profilePicture().name()
        );

        Filedb profilePicture = fileStorageService.store(profilePictureMultipart);

        User user = User.builder()
            .firstName(request.firstName())
            .lastName(request.lastName())
            .promotionYear(request.promotionYear())
            .birthDate(request.birthDate())
            .role(RoleEnum.STUDENT)
            .filedb(profilePicture)
            .email(request.email())
            .password(passwordEncoder.encode(request.password()))
            .build();
        Map<String, Object> extraClaims = getExtraClaims(user);
        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(user, extraClaims);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .build();
    }

    public AuthenticationResponse tutorRegistration(RegisterRequest request) throws IOException {

        // check if email is already registered
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        MultipartFile profilePictureMultipart = Base64ToMultipartFileConverter.convert(
            request.profilePicture().base64(),
            request.profilePicture().type(),
            request.profilePicture().name()
        );

        Filedb profilePicture = fileStorageService.store(profilePictureMultipart);

        User user = User.builder()
            .firstName(request.firstName())
            .lastName(request.lastName())
            .promotionYear(request.promotionYear())
            .birthDate(request.birthDate())
            .role(RoleEnum.TUTOR)
            .filedb(profilePicture)
            .email(request.email())
            .password(passwordEncoder.encode(request.password()))
            .build();
        Map<String, Object> extraClaims = getExtraClaims(user);
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
        Map<String, Object> extraClaims = getExtraClaims(user);
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

    private Map<String, Object> getExtraClaims(User user) {
        String profilePictureUri = ServletUriComponentsBuilder
            .fromCurrentContextPath()
            .path("/files/")
            .path(user.getFiledb().getId())
            .toUriString();
        Map<String, Object> extraClaims = new HashMap<>(Map.of(
            "role", user.getRole(),
            "email", user.getEmail(),
            "firstName", user.getFirstName(),
            "lastName", user.getLastName()
        ));
        if (user.getBirthDate() != null) {
            extraClaims.put("birthDate", user.getBirthDate());
        }
        if (user.getPromotionYear() != null) {
            extraClaims.put("promotionYear", user.getPromotionYear());
        }
        if (user.getFiledb() != null) {
            extraClaims.put("profilePicture", profilePictureUri);
        }
        return extraClaims;
    }
}
