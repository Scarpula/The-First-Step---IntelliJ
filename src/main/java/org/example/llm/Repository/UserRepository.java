package org.example.llm.Repository;

import org.example.llm.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    // 기존에 사용하던 findByEmail 메서드 제거
    // 필요하다면 추가적인 쿼리 메서드를 정의
}
