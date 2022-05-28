package com.example.project4_1.mypage.temporaryPost;

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
    @GeneratedValue(strategy = GenerationType.AUTO) //id 자동증가
    private Long id;
    @Column
    private String writer; //작성자
    @Column
    @NotNull
    private String title; //제목
    @Column(columnDefinition = "LONGTEXT")
    @NotNull
    private String contents; //본문

    public TemporaryPost() {

    }

    public TemporaryPost(TemporaryPostDto.TemporaryPostSaveDto temporaryPostSaveDto) {
        title = temporaryPostSaveDto.getTitle();
        writer = temporaryPostSaveDto.getWriter();
        contents = temporaryPostSaveDto.getContents();
    }

    //    public TemporaryPost(TemporaryPostDto.TemporaryPostListDto temporaryPostListDto){
//        id=temporaryPostListDto.getId();
//        title=temporaryPostListDto.getTitle();
//        writer= temporaryPostListDto.getWriter();
//        contents= temporaryPostListDto.getContents();
//    }
    public TemporaryPost(TemporaryPostDto.TemporaryPostModifyDto temporaryPostModifyDto) {
        title = temporaryPostModifyDto.getTitle();
        writer = temporaryPostModifyDto.getWriter();
        contents = temporaryPostModifyDto.getContents();
    }


}
