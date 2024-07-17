package org.example.llm.Chatting.repository;

import org.example.llm.Chatting.entity.ChatContents;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatContentsRepository extends JpaRepository<ChatContents, Long> {
    List<ChatContents> findByRoomIdOrderByTimestampAsc(Long roomId);
}