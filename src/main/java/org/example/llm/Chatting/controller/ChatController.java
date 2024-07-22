package org.example.llm.Chatting.controller;

import jakarta.servlet.http.HttpSession;
import org.example.llm.Chatting.dto.CreateChatRoomRequest;
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
    public ResponseEntity<?> getChatRooms(@RequestParam String userId) {
        List<ChatRoom> chatRooms = chatService.getChatRooms(userId);
        return ResponseEntity.ok(chatRooms);
    }

    @DeleteMapping("/room/{roomId}")
    public ResponseEntity<?> deleteChatRoom(@PathVariable Long roomId, @RequestParam String userId) {
        try {
            chatService.deleteChatRoom(roomId, userId);
            return ResponseEntity.ok().body("Chat room deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}




