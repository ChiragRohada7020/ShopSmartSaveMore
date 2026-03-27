package com.cdac.service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.dto.RegisterRequest;
import com.cdac.dto.VerifyRequest;
import com.cdac.entity.User;
import com.cdac.repository.UserRepository;
import com.cdac.temp.TempUser;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // In-memory store for unverified users
    private Map<String, TempUser> tempUserStore = new ConcurrentHashMap<>();

    public void registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        String otp = generateOTP();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(10);

        TempUser tempUser = new TempUser(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                otp,
                expiry
        );

        // Store in-memory
        tempUserStore.put(request.getEmail(), tempUser);

        // Send email
        emailService.sendVerificationEmail(request.getEmail(), otp);
    }

    public void verifyEmail(VerifyRequest request) {
        TempUser tempUser = tempUserStore.get(request.getEmail());

        if (tempUser == null || !tempUser.getOtp().equals(request.getOtp_code().trim())) {
            throw new RuntimeException("Invalid OTP or email");
        }

        if (tempUser.getOtpExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        // Persist user to DB now
        User user = new User();
        user.setEmail(tempUser.getEmail());
        user.setUsername(tempUser.getUsername());
        user.setPassword(tempUser.getEncodedPassword());
      //  user.setCodeExpiryTime(null); // not used now
        userRepository.save(user);

        // Cleanup from temp store
        tempUserStore.remove(request.getEmail());
    }

    private String generateOTP() {
        return String.valueOf((int)(Math.random() * 900000) + 100000);
    }
}
