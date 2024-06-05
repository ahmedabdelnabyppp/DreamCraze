package com.dreamcraze.dreamcraze.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dreamcraze.dreamcraze.model.Category;
import com.dreamcraze.dreamcraze.repository.CategoryRepository;
import com.dreamcraze.dreamcraze.request.CategoryRequest;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    public Map<String, String> createCategory(CategoryRequest newCategory) {
        Map<String, String> response = new HashMap<>();
        categoryRepository.save(convertRequestToEntity(newCategory));
        response.put("status", "success");
        response.put("message", "Category created successfully");

        return response;
    }

    public Map<String, String> deleteCategory(int categoryId) {
        Map<String, String> response = new HashMap<>();
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            categoryRepository.delete(category);
            response.put("status", "success");
            response.put("message", "Category delete successfully");
        } else {
            throw new NoSuchElementException("Category with ID " + categoryId + " not found");
        }
        return response;
    }

    private Category convertRequestToEntity(CategoryRequest newCategory) {
        return Category.builder()
                .name(newCategory.getName())
                .image(newCategory.getImage())
                .build();
    }

}
