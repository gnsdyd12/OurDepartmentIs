package com.example.project4_1.mypage.temporaryPost;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TemporaryPostRepository extends JpaRepository<TemporaryPost,Long> {
    Optional<List<TemporaryPostDto.TemporaryPostListDto>> findByWriter(String writer);
}
