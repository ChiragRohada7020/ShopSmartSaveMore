package com.cdac.dto;

import com.cdac.entity.Product;

import lombok.Data;

@Data
public class AddProductToCartRequest {
	private String email;   // Who is adding
    private Product product;
}