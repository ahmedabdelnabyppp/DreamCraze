package com.dreamcraze.dreamcraze.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;

import com.dreamcraze.dreamcraze.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p JOIN FETCH p.category c WHERE c.name = :categoryName")
    List<Product> findAllByCategoryName(@Param("categoryName") String categoryName);

    @Query(value = "select * from Products p where p.description=:Description", nativeQuery = true)
    Optional<Product> findAllByDescription(@Param("Description") String categoryName);

    Product findById(int id);
    
    @Query("SELECT p FROM Product p JOIN FETCH p.category c WHERE c.name = :categoryName")
    Page<Product> findByProductNameLike(@Param("categoryName") String categoryName, Pageable pageDetails);
    
}
