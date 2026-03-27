package com.cdac.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyRequest {
	
    private String email;
 
    private String otp_code;
}
