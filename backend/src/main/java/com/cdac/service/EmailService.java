package com.cdac.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;



      public void sendPasswordResetEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Password Reset Request - Sanskari Platform");
        // In a real app, you'd send a link like: http://yourfrontend.com/reset-password?token=...
        message.setText("You have requested to reset your password.\n\n"
                      + "Use the following token to reset your password: " + otp + "\n\n"
                      + "If you did not request this, please ignore this email.");
        mailSender.send(message);
    }
    public void sendVerificationEmail(String toEmail, String code) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Smart Shop - Email Verification");

            String htmlContent = """
            		<div style="background: linear-gradient(to right, #f8f9fa, #e3f2fd); padding: 40px; font-family: 'Segoe UI', sans-serif;">
            		  <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            		    <div style="text-align: center;">
            		      <img src="https://previews.123rf.com/images/arbati6/arbati61507/arbati6150700001/42252691-smart-shop-logo.jpg" alt="Smart Shop Logo" style="width: 100px; margin-bottom: 20px;" />
            		    </div>
            		    <h2 style="text-align: center; color: #1a73e8;">Welcome to <strong>Smart Shop</strong>!</h2>
            		    <p style="text-align: center; font-size: 16px; color: #444;">We're glad to have you on board. Use the OTP below to verify your email address:</p>
            		    
            		    <div style="text-align: center; margin: 30px 0;">
            		      <div style="display: inline-block; background: #1a73e8; color: white; font-size: 26px; padding: 15px 30px; border-radius: 10px; letter-spacing: 5px; font-weight: bold;">
            		        """ + code + """
            		      </div>
            		    </div>

            		    <p style="text-align: center; font-size: 14px; color: #999;">
            		      This OTP is valid for 10 minutes.<br>If you didn’t request this, please ignore this email.
            		    </p>
            		    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
            		    <p style="text-align: center; font-size: 12px; color: #bbb;">
            		      &copy; 2025 Smart Shop. All rights reserved.
            		    </p>
            		  </div>
            		</div>
            		""";

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send verification email");
        }
    }
}
