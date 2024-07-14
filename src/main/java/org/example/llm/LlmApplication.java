package org.example.llm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "org.example.llm.Member.Repository")
public class LlmApplication {
	public static void main(String[] args) {
		SpringApplication.run(LlmApplication.class, args);
	}

}
