package com.example.project4_1.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // findByEmail: 소셜 로그인으로 반환되는 값 중에서 email을 통해 생성된 사용자인지 처음 가입한 사용자인지 판단
    Optional<User> findByEmail(String email);
}