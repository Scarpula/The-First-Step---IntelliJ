package org.example.llm.Chatting.controller;

import org.example.llm.Chatting.entity.ChatContents;
import org.example.llm.Chatting.entity.ChatRoom;
import org.example.llm.Chatting.repository.ChatContentsRepository;
import org.example.llm.Chatting.repository.ChatRoomRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ChatController {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatContentsRepository chatContentsRepository;

    public ChatController(ChatRoomRepository chatRoomRepository, ChatContentsRepository chatContentsRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.chatContentsRepository = chatContentsRepository;
    }

    @PostMapping("/room")
    public ChatRoom createRoom(@RequestBody ChatRoom room) {
        return chatRoomRepository.save(room);
    }

    @GetMapping("/rooms")
    public List<ChatRoom> getRooms() {
        return chatRoomRepository.findAll();
    }

    @PostMapping("/content")
    public ChatContents createContent(@RequestBody ChatContents contents) {
        return chatContentsRepository.save(contents);
    }

    @GetMapping("/contents/{roomId}")
    public List<ChatContents> getContents(@PathVariable Long roomId) {
        return chatContentsRepository.findByRoomIdOrderByTimestampAsc(roomId);
    }
}
