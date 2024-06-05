package com.dreamcraze.dreamcraze.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dreamcraze.dreamcraze.model.Address;
import com.dreamcraze.dreamcraze.request.ActiveAddressRequest;
import com.dreamcraze.dreamcraze.request.AddressRequest;
import com.dreamcraze.dreamcraze.service.AddressService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/address")
public class AddressController {
    @Autowired
    private AddressService addressService;
  
    @PostMapping("/create")
    public ResponseEntity<?> newAddress(@Valid @RequestBody AddressRequest AddressData, BindingResult result) {
        return addressService.createAddress(AddressData);
    }

    @GetMapping("/users/{userId}/addresses")
    public List<Address> getUserAddresses(@PathVariable int userId) {
        return addressService.getUserAddresses(userId);
    }

    @GetMapping("/OrderAddress/{userId}")
    public List<Address> getOrderAddress(@PathVariable int userId) {
        return addressService.findActiveAddressesByUserId(userId);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteAddress(@RequestBody int addresId) {
        return addressService.Delete_Address(addresId);
    }

    @PostMapping("/active")
    public ResponseEntity<Map<String, String>> activeAddressUser(
        @Valid  @RequestBody ActiveAddressRequest activeAddressRequest,BindingResult result) {
        return ResponseEntity.ok().body(addressService.activeAddressUserByUserId(activeAddressRequest.getAddresId(),
                activeAddressRequest.getUserId()));
    }

}
