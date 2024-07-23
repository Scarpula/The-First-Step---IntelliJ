package org.example.llm.Chatting.repository;

import org.example.llm.Chatting.entity.ChatContents;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatContentsRepository extends JpaRepository<ChatContents, Long> {
}