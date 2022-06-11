package com.example.project4_1.post;

import com.example.project4_1.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class PostDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PostSaveDto {

        private String title;
        private String contents;
        private String writer;
        private User uid;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostModifyDto {

        private Long id;
        private String title;
        private String contents;
        private String writer;

        public PostModifyDto(Post post) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.contents = post.getContents();
            this.writer = post.getWriter();
        }

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PostListDto {

        private Long id;
        private String title;
        private String contents;
        private String writer;
        private Long heartCount;
        private LocalDateTime createTime;
        private User uid;

    }


    @Getter
    @Setter
    @AllArgsConstructor
    public static class PostDetailDto {

        private Long id;
        private String title = "";
        private String contents = "";
        private String writer = "";
        private Long views = 0L;
        private LocalDateTime createTime;
        private Long heartCount = 0L;
        private User uid;

        public PostDetailDto(Post post) {
            this.id = post.getId();
            this.title = post.getTitle();
            this.contents = post.getContents();
            this.writer = post.getWriter();
            this.views = post.getViews();
            this.heartCount = post.getHeartCount();
            this.createTime = post.getCreateTime();
            this.uid = post.getUid();
        }

    }

}
