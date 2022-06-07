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
        private Long pid; // 게시물번호
        private Long uid; // 유저 아이디
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class IsHeartDto{
        private Long pid; // 게시물번호
        private Long uid; // 유저 아이디
    }


}
