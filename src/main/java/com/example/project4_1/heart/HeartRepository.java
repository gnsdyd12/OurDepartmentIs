package com.example.project4_1.heart;

import com.example.project4_1.SessionUser;
import com.example.project4_1.post.Post;
import com.example.project4_1.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long> {


    Optional<Heart> findByUidAndPid(User uid, Post pid);

    Optional<List<Heart>> findAllByUid(User uid);
}
