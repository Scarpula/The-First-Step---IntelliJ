package org.example.llm.Chatting.controller;

import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.service.ChatService;
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
    public ResponseEntity<?> createChatRoom(@RequestBody Map<String, String> payload) {
        try {
            String userId = payload.get("userId");
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.badRequest().body("UserId is required");
            }
            ChatRoom chatRoom = chatService.createChatRoom(userId);
            return ResponseEntity.ok(chatRoom);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/rooms")
    public ResponseEntity<?> getChatRooms(@RequestBody Map<String, String> payload) {
        try {
            String userId = payload.get("userId");
            List<ChatRoom> chatRooms = chatService.getChatRooms(userId);
            return ResponseEntity.ok(chatRooms);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching chat rooms: " + e.getMessage());
        }
    }

    @DeleteMapping("room/delete")
    public ResponseEntity<?> deleteChatRoom(@RequestBody Map<String, Object> payload) {
        Long roomId = ((Number) payload.get("room")).longValue();
        String userId = (String) payload.get("userId");

        try {
            chatService.deleteChatRoom(roomId, userId);
            return ResponseEntity.ok().body("Chat room deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

}




