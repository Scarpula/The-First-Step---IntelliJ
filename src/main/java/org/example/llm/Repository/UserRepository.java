package org.example.llm.Repository;


import org.example.llm.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

//@Repository
@NoRepositoryBean
public interface UserRepository extends JpaRepository<UserEntity, String> {

}
