package org.example.llm.Member.Repository;

import org.example.llm.Member.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    Boolean existsByEmail(String email);

    UserEntity findByEmail(String email);

}