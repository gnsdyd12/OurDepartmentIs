package com.example.project4_1.heart;

import com.example.project4_1.post.Post;
import com.example.project4_1.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long> {

    Optional<Heart> findHeartByUidAndPid(User uid, Post pid);
}
