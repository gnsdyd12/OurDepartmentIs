package com.example.project4_1.heart;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class HeartDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class MyHeartDto {
        private Long pid; // 게시물 번호
        private Long uid; // 사용자 아이디
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class IsHeartDto {
        private Long pid; // 게시물 번호
        private Long uid; // 사용자 아이디
    }

}
