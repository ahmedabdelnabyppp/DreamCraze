package com.dreamcraze.dreamcraze.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dreamcraze.dreamcraze.exception.ApiRequestException;
import com.dreamcraze.dreamcraze.model.Address;
import com.dreamcraze.dreamcraze.model.User;
import com.dreamcraze.dreamcraze.repository.AddressRepository;
import com.dreamcraze.dreamcraze.repository.UserRepository;
import com.dreamcraze.dreamcraze.request.AddressRequest;
import com.dreamcraze.dreamcraze.security.Cipher.CipherService;
import com.dreamcraze.dreamcraze.security.Cipher.EncryptionService;

@Service
public class AddressService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CipherService cipherService;

    @Autowired
    private EncryptionService encryptionService;

    public ResponseEntity<Map<String, String>> createAddress(AddressRequest addressData) {
        User userDetails = userRepository.findById(addressData.getUserId());
        Address newAddress = encryptAddress(userDetails, addressData);
        addressRepository.save(newAddress);
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("message", "Address created successfully");
        return ResponseEntity.status(HttpStatus.CREATED).body(responseBody);

    }

    public ResponseEntity<?> Delete_Address(int addresId) {
        try {
            Optional<Address> address = addressRepository.findById(addresId);
            if (address.isPresent()) {
                addressRepository.deleteById(addresId);
                Map<String, String> responseBody = new HashMap<>();
                responseBody.put("message", "Address delete successfully");
                return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseBody);
            }
        } catch (DataAccessException e) {
            throw new ApiRequestException("Error:" + ' ' + e.getMessage());
        }
        return null;
    }

    public List<Address> getUserAddresses(int userId) {
        try {
            List<Address> UserAddresses = addressRepository.findByUserId(userId);
            return decryptAddress(UserAddresses);
        } catch (DataAccessException e) {
            throw new ApiRequestException("Error:" + ' ' + e.getMessage());
        }
    }

    public List<Address> findActiveAddressesByUserId(int userId) {
        try {
            List<Address> UserAddresses = addressRepository.findActiveAddressesByUserId(userId);
            return decryptAddress(UserAddresses);
        } catch (DataAccessException e) {
            throw new ApiRequestException("Error:" + ' ' + e.getMessage());
        }
    }

    public Map<String, String> activeAddressUserByUserId(int addressId, int userId) {
        Map<String, String> massageRespone = new HashMap<>();
        massageRespone.put("message", "Address active successfully");
        this.addressRepository.deactivateAddressesByUserId(userId);
        this.addressRepository.activateAddressByAddressIdAndUserId(addressId, userId);
        return massageRespone;
    }

    private Address encryptAddress(User userDetails, AddressRequest addressData) {
        return Address.builder()
                .street(cipherService.encryptData(addressData.getStreet()))
                .city(cipherService.encryptData(addressData.getCity()))
                .country(cipherService.encryptData(addressData.getCountry()))
                .user(userDetails)
                .landmark(cipherService.encryptData(addressData.getLandmark()))
                .deliveryInstruction(cipherService.encryptData(addressData.getDeliveryInstruction()))
                .build();
    }

    private List<Address> decryptAddress(List<Address> UserAddresses) {
        List<Address> decryptAddressResponse = new ArrayList<>();
        for (Address oneAddress : UserAddresses) {
            Address newAddress = new Address();
            newAddress.setStreet(cipherService.decryptData(oneAddress.getStreet()));
            newAddress.setCity(cipherService.decryptData(oneAddress.getCity()));
            newAddress.setId(oneAddress.getId());
            newAddress.setCountry(cipherService.decryptData(oneAddress.getCountry()));
            newAddress.setLandmark(cipherService.decryptData(oneAddress.getLandmark()));
            newAddress.setDeliveryInstruction(cipherService.decryptData(oneAddress.getDeliveryInstruction()));
            decryptAddressResponse.add(newAddress);
        }
        return decryptAddressResponse;
    }

    @SuppressWarnings("unused")
    private Address encryptAddressWithDES(User userDetails, AddressRequest addressData) {
        return Address.builder()
                .street(encryptionService.encryptDES(addressData.getStreet()))
                .city(encryptionService.encryptDES(addressData.getCity()))
                .country(encryptionService.encryptDES(addressData.getCountry()))
                .user(userDetails)
                .landmark(encryptionService.encryptDES(addressData.getLandmark()))
                .deliveryInstruction(encryptionService.encryptDES(addressData.getDeliveryInstruction()))
                .build();
    }

    @SuppressWarnings("unused")
    private List<Address> decryptAddressWithDES(List<Address> UserAddresses) {
        List<Address> decryptAddressResponse = new ArrayList<>();
        for (Address oneAddress : UserAddresses) {
            Address newAddress = new Address();
            newAddress.setStreet(encryptionService.decryptDES(oneAddress.getStreet()));
            newAddress.setCity(encryptionService.decryptDES(oneAddress.getCity()));
            newAddress.setId(oneAddress.getId());
            newAddress.setCountry(encryptionService.decryptDES(oneAddress.getCountry()));
            newAddress.setLandmark(encryptionService.decryptDES(oneAddress.getLandmark()));
            newAddress.setDeliveryInstruction(encryptionService.decryptDES(oneAddress.getDeliveryInstruction()));
            decryptAddressResponse.add(newAddress);
        }
        return decryptAddressResponse;
    }
}
