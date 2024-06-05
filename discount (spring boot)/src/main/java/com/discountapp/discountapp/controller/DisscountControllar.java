package com.discountapp.discountapp.controller;

import org.springframework.web.bind.annotation.RestController;

import com.discountapp.discountapp.model.Discount;
import com.discountapp.discountapp.request.DiscountRequest;
import com.discountapp.discountapp.services.DiscountService;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("discountapi")
public class DisscountControllar {
    @Autowired
    private DiscountService discountService;

    @GetMapping("/discount/{code}")
    public Discount getdiscount(@PathVariable("code") String code) throws Exception {
        return discountService.getDiscountByCode(code);
    }

    @PostMapping("/discount")
    public ResponseEntity<Map<String, String>> saveDiscound(@RequestBody DiscountRequest discountRequest) {
        return ResponseEntity.ok().body(discountService.createDiscount(discountRequest));
    }

    @GetMapping("/all")
    public List<Discount> getAllDiscount() {
        return discountService.getAllDiscount();
    }

}
