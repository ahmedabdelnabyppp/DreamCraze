package com.discountapp.discountapp.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.discountapp.discountapp.model.Discount;
import com.discountapp.discountapp.repository.DiscoundRepository;
import com.discountapp.discountapp.request.DiscountRequest;

@Service
public class DiscountService {

    @Autowired
    private DiscoundRepository discountRepository;

    public Map<String, String> createDiscount(DiscountRequest discount) {
        Map<String, String> httpResponse = new HashMap<>();
        httpResponse.put("status", "success");
        httpResponse.put("message", "discound save successfuly");
        discountRepository.save(Discount.discountRequestToDiscountEntity(discount));
        return httpResponse;
    }

    public Discount getDiscountByCode(String code) {
        return discountRepository.findBycode(code);
    }

    public List<Discount> getAllDiscount() {
        return discountRepository.findAll();
    }
    
}
