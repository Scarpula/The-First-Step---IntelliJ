package org.example.llm.Chatting.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "Chatting_Contents")
public class ChatContents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom roomId;

    private String chatter;

    private String chatting;

    private LocalDateTime chattedAt;


}
