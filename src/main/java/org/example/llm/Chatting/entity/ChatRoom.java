package org.example.llm.Chatting.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Data
@Entity
@Getter
@Setter
@Table(name = "chatting_room1")
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "opend_at")
    private LocalDateTime openedAt;

}
