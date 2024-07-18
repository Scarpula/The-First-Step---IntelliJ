package org.example.llm.Chatting.controller;

import org.example.llm.Chatting.dto.chatMessageDto;
import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.service.ChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;


    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/room")
    public ResponseEntity<Map<String, Long>> createRoom() {
        String userId = chatService.getCurrentUserId();
        Long roomId = chatService.createRoom(userId);
        return ResponseEntity.ok(Map.of("roomId", roomId));
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveMessages(@RequestBody chatMessageDto chatMessageDto) {
        String userId = chatService.getCurrentUserId();
        try {
            chatService.saveMessages(chatMessageDto.getRoomId(), userId,
                    chatMessageDto.getUserMessage(), chatMessageDto.getBotResponse());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }



    @GetMapping("/history/{roomId}")
    public ResponseEntity<List<ChatContents>> getChatHistory(@PathVariable Long roomId) {
        String userId = chatService.getCurrentUserId();
        try {
            List<ChatContents> history = chatService.getChatHistory(roomId, userId);
            return ResponseEntity.ok(history);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}
