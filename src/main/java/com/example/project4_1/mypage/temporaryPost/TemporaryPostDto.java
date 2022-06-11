package com.example.project4_1.mypage.temporaryPost;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class TemporaryPostDto {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class TemporaryPostSaveDto {
        private String title;
        private String contents;
        private String writer;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class TemporaryPostListDto {
        private Long id;
        private String title;
        private String contents;
        private String writer;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class TemporaryPostModifyDto {
        private Long id;
        private String title;
        private String contents;
        private String writer;

        public TemporaryPostModifyDto(TemporaryPost temporaryPost) {
            this.id = temporaryPost.getId();
            this.title = temporaryPost.getTitle();
            this.contents = temporaryPost.getContents();
            this.writer = temporaryPost.getWriter();
        }
    }

}
