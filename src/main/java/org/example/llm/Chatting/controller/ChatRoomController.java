package org.example.llm.Chatting.controller;

import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @GetMapping("/rooms")
    public List<ChatRoom> getUserChatRooms(@RequestParam("userId") String userId) {
        return chatRoomService.getChatRoomsByUserId(userId);
    }

    @RequestMapping("/room")
    public ResponseEntity<?> createChatRoom(@RequestBody Map<String, String> payload) {
        try {
            String userId = payload.get("userId");
            if (userId == null || userId.isEmpty()) {
                return ResponseEntity.badRequest().body("UserId is required");
            }
            ChatRoom chatRoom = chatRoomService.createChatRoom(userId);
            return ResponseEntity.ok(chatRoom);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("room/delete")
    public ResponseEntity<?> deleteChatRoom(@RequestBody Map<String, Object> payload) {
        try {
            int chatroomId = (int) Long.parseLong(payload.get("chatroomId").toString());
            String userId = payload.get("userId").toString();

            boolean isDeleted = chatRoomService.deleteChatRoom(chatroomId, userId);

            if (isDeleted) {
                return ResponseEntity.ok().body("Chat room deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chat room not found or user not authorized");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting chat room: " + e.getMessage());
        }
    }
}