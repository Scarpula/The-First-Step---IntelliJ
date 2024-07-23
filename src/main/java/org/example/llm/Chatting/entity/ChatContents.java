package org.example.llm.Chatting.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "chattingcontents")
public class ChatContents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom roomId;

    @Enumerated(EnumType.STRING)
    @Column(name = "chatter")
    private ChatterType chatter;

    @Column(name = "chatting")
    private String chatting;

    @Column(name = "chatted_at")
    private LocalDateTime chattedAt;


}

