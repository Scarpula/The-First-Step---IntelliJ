package org.example.llm.Repository;


import org.example.llm.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    public boolean existsByEmailAndPassword(String email, String password);
}