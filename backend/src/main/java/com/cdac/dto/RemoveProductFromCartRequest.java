package com.cdac.dto;

import com.cdac.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RemoveProductFromCartRequest {
    private String email;
    // The ID of the product to remove
    Product product ;
}