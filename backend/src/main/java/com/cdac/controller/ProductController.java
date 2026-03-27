package com.cdac.controller;

import com.cdac.entity.Product;
import com.cdac.service.ScraperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/compare")
public class ProductController {

    @Autowired
    private ScraperService scraperService;

    @GetMapping
    public List<Product> compare(@RequestParam("q") String query) {
        return scraperService.fetchAndCompareProducts(query);
    }
}
