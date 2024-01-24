package com.advancedprogramming.api.services;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

public class Base64ToMultipartFileConverter {

    public static MultipartFile convert(String base64String, String type, String fileName) {
        // Decode the base64 string to bytes
        byte[] decodedBytes = base64String.getBytes();

        // Create a CommonsMultipartFile from the DiskFileItem
        MultipartFile multipartFile = new MockMultipartFile(fileName, fileName, type, decodedBytes);

        return multipartFile;
    }

}
