package com.example.project4_1.mypage.temporaryPost;

import com.example.project4_1.user.User;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class TemporaryPost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //id 자동 증가
    private Long id;

    @Column
    private String writer; // 작성자

    @Column
    @NotNull
    private String title; // 제목

    @Column(columnDefinition = "LONGTEXT")
    @NotNull
    private String contents; // 본문

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User uid; // 사용자 아이디

    public TemporaryPost() {

    }

    public TemporaryPost(TemporaryPostDto.TemporaryPostSaveDto temporaryPostSaveDto) {
        title = temporaryPostSaveDto.getTitle();
        writer = temporaryPostSaveDto.getWriter();
        contents = temporaryPostSaveDto.getContents();
        uid = temporaryPostSaveDto.getUid();
    }

    public TemporaryPost(TemporaryPostDto.TemporaryPostModifyDto temporaryPostModifyDto) {
        title = temporaryPostModifyDto.getTitle();
        writer = temporaryPostModifyDto.getWriter();
        contents = temporaryPostModifyDto.getContents();
    }

}
