package com.cdac.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.AddProductToCartRequest;
import com.cdac.dto.JwtResponse;
import com.cdac.dto.JwtToken;
import com.cdac.dto.RemoveProductFromCartRequest;
import com.cdac.entity.Product;
import com.cdac.security.JwtUtil;
import com.cdac.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*") // allow cross-origin requests if frontend is separate
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private JwtUtil jwtUtil ; 

    @PostMapping("/add")
    public String addProductToCart(@RequestBody AddProductToCartRequest request) {
        cartService.addProductToCart(request);
        return    "Product added to cart successfully";
    }
    
/// GET endpoint to retrieve all products in a user's cart
    @PostMapping("/cart_products")
    public ResponseEntity<?> getCartProducts(@RequestBody JwtToken jwtToken ) {
        try {
            
            
            // Extract email from token
            String email = jwtUtil.extractUsername(jwtToken.getToken() );
            
            // Validate email extraction
            if (email == null || email.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
            
            List<Product> products = cartService.getProductsByEmail(email);
            return ResponseEntity.ok(products);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                   .body("An error occurred: " + e.getMessage());
        }
    }
    
    // DELETE endpoint to remove a product from the cart
    @DeleteMapping("/remove")
    public ResponseEntity<String> removeProductFromCart(@RequestBody RemoveProductFromCartRequest request) {
        try {
            cartService.removeProductFromCart(request);
            return new ResponseEntity<>("Product removed from cart successfully", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    
}