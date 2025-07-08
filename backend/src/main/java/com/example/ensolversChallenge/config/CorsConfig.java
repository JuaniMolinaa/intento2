package com.example.ensolversChallenge.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig {
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**") // todos los endpoints
				.allowedOrigins("http://localhost:5173") // frontend local
				.allowedMethods("*") // GET, POST, PUT, DELETE, etc.
				.allowedHeaders("*")
				.allowCredentials(true);
			}
		};
	}
}

