package com.visualstudio.rest.api.configuration;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import java.util.Map;

public class CloudinaryConfiguration {
    @Value("${cloudinary.wilsondelcanto-dev}")
    private String cloudName;
    @Value("${cloudinary.4981956113747652}")
    private String apiKey;
    @Value("${cloudinary.Cmk4j2sqcxaP_jbB0PYWf646WQ4}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(
                Map.of(
                        "wilsondelcanto-dev", cloudName,
                        "4981956113747652", apiKey,
                        "Cmk4j2sqcxaP_jbB0PYWf646WQ4", apiSecret
                )
        );
    }
}
