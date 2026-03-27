package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entity.Cart;
import com.cdac.entity.User;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

	 Optional<Cart> findByUser(User user);
}