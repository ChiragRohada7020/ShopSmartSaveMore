package com.cdac.entity;

import java.io.Serializable;
import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductListWrapper implements Serializable {
    private List<Product> products;
}
