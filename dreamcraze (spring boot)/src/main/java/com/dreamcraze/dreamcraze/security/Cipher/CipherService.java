package com.dreamcraze.dreamcraze.security.Cipher;

import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class CipherService {
    private static final String secretKeyString = "e0dZBYPBRnWWuWAIPzabHo0ZkEQqZHDAC6lDIlJMk6Q=";
    
    private static final String algorithm = "AES";
    private static final String mode = "ECB";
    private static final String padding = "PKCS5Padding";

    public String decryptData(String encryptedData) {
        try {
            // Decode Base64-encoded secret key string
            byte[] decodedKeyBytes = Base64.getDecoder().decode(secretKeyString);
            // Initialize SecretKey
            SecretKey secretKeySpec = new SecretKeySpec(decodedKeyBytes, algorithm);
            // Initialize Cipher for decryption
            Cipher cipher = Cipher.getInstance(algorithm + "/" + mode + "/" + padding);
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec);
            // Decrypt the Base64-encoded encrypted data
            byte[] decryptedDataBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedData));
            return new String(decryptedDataBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error decrypting data: " + e.getMessage();
        }
    }

    public  String encryptData(String plaintext) {
        try {
            // Decode Base64-encoded secret key string
            byte[] decodedKeyBytes = Base64.getDecoder().decode(secretKeyString);
            // Initialize SecretKey
            SecretKey secretKeySpec = new SecretKeySpec(decodedKeyBytes, algorithm);
            // Initialize Cipher for encryption
            Cipher cipher = Cipher.getInstance(algorithm + "/" + mode + "/" + padding);
            cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec);
            // Encrypt the plaintext
            byte[] encryptedDataBytes = cipher.doFinal(plaintext.getBytes());
            return Base64.getEncoder().encodeToString(encryptedDataBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error encrypting data: " + e.getMessage();
        }
    }
    // String plaintext = "ahmed abdel nabi";
    // String encryptedData = encryptData(plaintext);
    // System.out.println("Encrypted Data: " + encryptedData);

    // String decryptedData = decryptData(encryptedData);
    // System.out.println("Decrypted Data: " + decryptedData);
}
