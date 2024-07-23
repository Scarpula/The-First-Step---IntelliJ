package org.example.llm.Chatting.controller;

import org.example.llm.Chatting.dto.ChatMessageDTO;
import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.service.ChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatContentConterller {

    private final ChatService chatService;



    public ChatContentConterller(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/save/user")
    public ResponseEntity<?> saveUserMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        System.out.println("Received message: " + chatMessageDTO);
        if (chatMessageDTO.getRoomId() == null || chatMessageDTO.getChatting() == null || chatMessageDTO.getSender() == null) {
            return ResponseEntity.badRequest().body("All fields (roomId, chatting, sender) are required");
        }
        try {
            ChatContents savedMessage = chatService.saveMessage(
                    chatMessageDTO.getRoomId(),
                    chatMessageDTO.getChatting(),
                    chatMessageDTO.getSender()
            );
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving message: " + e.getMessage());
        }
    }

    @PostMapping("/save/chatbot")
    public ResponseEntity<ChatContents> saveChatbotMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        ChatContents savedMessage = chatService.saveMessage(
                chatMessageDTO.getRoomId(),
                chatMessageDTO.getChatting(),
                chatMessageDTO.getSender()
        );
        return ResponseEntity.ok(savedMessage);
    }


}
