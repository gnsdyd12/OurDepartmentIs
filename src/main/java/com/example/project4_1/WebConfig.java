package com.example.project4_1;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://3.36.128.239:3000")
//                .allowedOrigins("http://localhost:3000")
                .allowCredentials(true)
                .allowedMethods("*")
                .maxAge(3000);
    }
}

