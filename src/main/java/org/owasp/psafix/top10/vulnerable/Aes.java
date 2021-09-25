package org.owasp.psafix.top10.vulnerable;

import org.springframework.util.Base64Utils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;

/**
 *
 */
public class Aes {
    static byte[] encrypt(SecretKey secretKey, byte[] data) throws GeneralSecurityException {
        return null;
    }

    static byte[] decrypt(SecretKey secretKey, byte[] data)  throws GeneralSecurityException{
        return null;
    }


    public static void main(String[] args)  throws GeneralSecurityException {
        // Generer une cle secrete
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        kg.init(128);
        SecretKey key = kg.generateKey();


        String data = "MES DONNEES A CHIFFRER !!!!";
        // Chiffrer
        byte[] encrypted = encrypt(key, data.getBytes(StandardCharsets.UTF_8));
        System.out.println("Donnée chiffrée : " + Base64Utils.encodeToString(encrypted));

        // Déchiffrer
        byte[] clearText = decrypt(key, encrypted);
        System.out.println("Donnée déchiffrée : " + new String(clearText, StandardCharsets.UTF_8));

        // Chiffrer
        byte[] encrypted2 = encrypt(key, data.getBytes(StandardCharsets.UTF_8));
        System.out.println("Donnée chiffrée : " + Base64Utils.encodeToString(encrypted2));


    }
}
