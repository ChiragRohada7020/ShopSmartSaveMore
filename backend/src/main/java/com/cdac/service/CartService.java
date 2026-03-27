package com.cdac.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.AddProductToCartRequest;
import com.cdac.dto.RemoveProductFromCartRequest;
import com.cdac.entity.Cart;
import com.cdac.entity.Product;
import com.cdac.entity.User;
import com.cdac.repository.CartRepository;
import com.cdac.repository.UserRepository;

@Service
public class CartService {
	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepository;

	public void addProductToCart(AddProductToCartRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		Cart cart = cartRepository.findByUser(user).orElse(new Cart());
		cart.setUser(user);

		// Convert ProductDto to Product (Embeddable)
		Product dto = request.getProduct();
		Product product = new Product(dto.getId(), dto.getTitle(), dto.getSource(), dto.getCost(), dto.getImageUrl(),
				dto.getProductUrl());

		cart.addProduct(product);
		cartRepository.save(cart);
	}

	public List<Product> getProductsByEmail(String email) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		Cart cart = cartRepository.findByUser(user).orElseThrow(() -> new RuntimeException("Cart not found"));

		return cart.getProducts();
	}

	// New method to remove a product from the cart
	public void removeProductFromCart(RemoveProductFromCartRequest request) {
		User user = userRepository.findByEmail(request.getEmail())
				.orElseThrow(() -> new RuntimeException("User not found"));

		System.out.println("user found");
		Cart cart = cartRepository.findByUser(user)
				.orElseThrow(() -> new RuntimeException("Cart not found for user: " + request.getEmail()));

		// Create a Product object with email for removal comparison

		Product productToRemove = request.getProduct();

		// This relies on the Product.equals() method implemented earlier
		boolean productRemoved = cart.getProducts().remove(productToRemove);

		if (productRemoved == false) {
			throw new RuntimeException("Product with ID " + request.getProduct().getId() + " not found in cart.");
		}
		System.out.println("product removed");

		cartRepository.save(cart); // Save the updated cart
	}
}