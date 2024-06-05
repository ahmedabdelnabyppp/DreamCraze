package com.discountapp.discountapp.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.discountapp.discountapp.model.Discount;

@Repository
public interface DiscoundRepository extends JpaRepository<Discount, Integer> {
   @Query(value = "SELECT * FROM discount WHERE name = ?1", nativeQuery = true)
    Discount findBycode(String name);
}
