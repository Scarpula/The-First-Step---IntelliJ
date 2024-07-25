package org.example.llm.config;

import jakarta.persistence.EntityManager;
import org.example.llm.Chatting.repository.chatContentsRepository;
import org.example.llm.Chatting.repository.chatRoomRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;

@Configuration
public class RepositoryConfig {

    @Bean
    public chatRoomRepository chatRoomRepository(EntityManager entityManager) {
        return new JpaRepositoryFactory(entityManager).getRepository(chatRoomRepository.class);
    }

    @Bean
    public chatContentsRepository chatContentsRepository(EntityManager entityManager) {
        return new JpaRepositoryFactory(entityManager).getRepository(chatContentsRepository.class);
    }
}
