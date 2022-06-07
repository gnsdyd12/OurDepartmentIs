package com.example.project4_1.heart;


import com.example.project4_1.post.Post;
import com.example.project4_1.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class HeartDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class MyHeartDto{
        private Post pid; // 게시물번호
        private User uid; // 유저 아이디
    }

}