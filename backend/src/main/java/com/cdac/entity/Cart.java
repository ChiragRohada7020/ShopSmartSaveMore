package com.cdac.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

 
@Data
@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @ManyToOne
    
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    // Using ElementCollection to store simple Product data
    // If you need more complex relationship, consider @OneToMany with CartItem entity
    
    @CollectionTable(name = "cart_products", joinColumns = @JoinColumn(name = "cart_id"))
    @ElementCollection
    private List<Product> products = new ArrayList();

    

    // Helper method to add product to cart
    public void addProduct(Product product) {
        this.products.add(product);
         
    }

    // Helper method to remove product from cart
    public void removeProduct(Product product) {
        this.products.removeIf(p -> p.getId().equals(product.getId()));
         
    }

    // Calculate total cost of all products in cart
    public double getTotalCost() {
        return products.stream()
                .mapToDouble(Product::getCost)
                .sum();
    }
}