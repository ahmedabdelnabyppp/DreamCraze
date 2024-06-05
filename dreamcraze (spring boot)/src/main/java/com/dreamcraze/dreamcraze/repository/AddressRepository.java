package com.dreamcraze.dreamcraze.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.dreamcraze.dreamcraze.model.Address;

import jakarta.transaction.Transactional;

public interface AddressRepository extends JpaRepository<Address,Integer> {
    List<Address> findByUserId(int userId);

    @Modifying
    @Transactional
    @Query("UPDATE Address a SET a.isActive = false WHERE a.user.id = :userId")
    void deactivateAddressesByUserId(int userId);

    @Modifying
    @Transactional
    @Query("UPDATE Address a SET a.isActive = true WHERE a.id = :addressId AND a.user.id = :userId")
    void activateAddressByAddressIdAndUserId(int addressId, int userId);
    

    @Query("SELECT a FROM Address a WHERE a.isActive = true AND a.user.id = :userId")
    List<Address> findActiveAddressesByUserId(int userId);


}
