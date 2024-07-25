package org.example.llm.Chatting.controller;

import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}
