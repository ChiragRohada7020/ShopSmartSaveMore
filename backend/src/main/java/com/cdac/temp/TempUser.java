package com.cdac.temp;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TempUser implements Serializable {

    private static final long serialVersionUID = 1L;

    private String username;
    private String email;
    private String encodedPassword;
    private String otp;
    private LocalDateTime otpExpiry;

}