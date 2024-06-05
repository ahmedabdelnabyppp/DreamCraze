package com.dreamcraze.dreamcraze.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.dreamcraze.dreamcraze.model.Category;

import jakarta.transaction.Transactional;


@Repository
public interface CategoryRepository  extends JpaRepository<Category,Integer>  {
    @Transactional
    @Modifying
    @Query("DELETE FROM Product p WHERE p.category = :category")
    void deleteCategoryAndProducts(Category category);
}
