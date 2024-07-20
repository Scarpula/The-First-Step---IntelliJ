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
    public ResponseEntity<Map<String, String>> createRoom(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        if (userId == null || userId.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "User ID is required"));
        }
        Long roomId = chatService.createRoom(userId);
        return ResponseEntity.ok(Map.of("roomId", String.valueOf(roomId)));
    }

    @GetMapping("/rooms/{userId}")
    public ResponseEntity<List<ChatRoom>> getRooms(@PathVariable String userId) {
        if (userId == null || userId.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<ChatRoom> rooms = chatService.getRoomsByUserId(userId);
        return ResponseEntity.ok(rooms);
    }

    @DeleteMapping("/room/{roomId}/{userId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId, @PathVariable String userId) {
        if (userId == null || userId.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        chatService.deleteRoom(roomId, userId);
        return ResponseEntity.noContent().build();
    }











}
