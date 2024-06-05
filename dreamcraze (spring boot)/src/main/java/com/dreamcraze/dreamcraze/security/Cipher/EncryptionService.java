package com.dreamcraze.dreamcraze.security.Cipher;

import org.springframework.stereotype.Service;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class EncryptionService {

    private static final String DES_KEY = "0123456789abcdef".substring(0, 8);
    //For TripleDES, pad the key string with zeros to make it 24 bytes long.
    private static final String TRIPLE_DES_KEY = "0123456789abcdef01234567".substring(0, 24); 

    public String encryptDES(String plaintext) {
        try {
            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
            SecretKey secretKey = new SecretKeySpec(DES_KEY.getBytes(), "DES");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error encrypting data: " + e.getMessage();
        }
    }

    public String decryptDES(String encryptedText) {
        try {
            Cipher cipher = Cipher.getInstance("DES/ECB/PKCS5Padding");
            SecretKey secretKey = new SecretKeySpec(DES_KEY.getBytes(), "DES");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
            return new String(decryptedBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error decrypting data: " + e.getMessage();
        }
    }

    public String encryptTripleDES(String plaintext) {
        try {
            Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
            SecretKey secretKey = new SecretKeySpec(TRIPLE_DES_KEY.getBytes(), "DESede");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error encrypting data: " + e.getMessage();
        }
    }

    public String decryptTripleDES(String encryptedText) {
        try {
            Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
            SecretKey secretKey = new SecretKeySpec(TRIPLE_DES_KEY.getBytes(), "DESede");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
            return new String(decryptedBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error decrypting data: " + e.getMessage();
        }
    }
}
