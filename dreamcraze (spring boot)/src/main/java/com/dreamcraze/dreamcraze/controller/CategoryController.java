package com.dreamcraze.dreamcraze.controller;

import org.springframework.web.bind.annotation.RestController;

import com.dreamcraze.dreamcraze.service.CategoryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.dreamcraze.dreamcraze.model.Category;
import com.dreamcraze.dreamcraze.request.CategoryRequest;

@RestController
@RequestMapping("api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("allCategories")
    public List<Category> getAllCategory() {
        return categoryService.getAllCategory();
    }

    @PostMapping("createCategory")
    public ResponseEntity<Map<String, String>> createCategory(@Valid @RequestBody CategoryRequest newCategory,BindingResult result) {
        return ResponseEntity.ok().body(categoryService.createCategory(newCategory));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteCategory(@PathVariable int id) {
        return ResponseEntity.ok().body(categoryService.deleteCategory(id));
    }
}
