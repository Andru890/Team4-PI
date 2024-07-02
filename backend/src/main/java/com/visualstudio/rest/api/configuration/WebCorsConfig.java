package com.visualstudio.rest.api.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@Order(1)
public class WebCorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                 .allowedOrigins("http://localhost:3000/", "http://visualstudioservice.duckdns.org:3000", "https://visualstudioservice.pro")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);

    }
}