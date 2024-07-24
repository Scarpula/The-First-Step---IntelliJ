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
        try {
            ChatContents savedMessage = chatService.saveMessage(
                    chatMessageDTO.getRoomId().getRoomId(),
                    chatMessageDTO.getChatting(),
                    "USER"
            );
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving user message: " + e.getMessage());
        }
    }

    @PostMapping("/save/chatbot")
    public ResponseEntity<?> saveChatbotMessage(@RequestBody ChatMessageDTO chatMessageDTO) {
        try {
            ChatContents savedMessage = chatService.saveMessage(
                    chatMessageDTO.getRoomId().getRoomId(),
                    chatMessageDTO.getChatting(),
                    "CHATBOT"
            );
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving chatbot message: " + e.getMessage());
        }
    }


}
