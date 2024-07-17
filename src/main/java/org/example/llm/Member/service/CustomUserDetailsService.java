package org.example.llm.Member.service;

import org.example.llm.Member.Entity.UserEntity;
import org.example.llm.Member.Repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // 사용자의 권한을 설정할 때는 사용자 객체(User)의 authorities() 메서드를 이용합니다.
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ROLE_USER");

        return new User(user.getEmail(), user.getPassword(), authorities);
    }
}
