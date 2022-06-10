package com.example.project4_1.post;

import com.example.project4_1.heart.Heart;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Post {

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

    @Column
    private LocalDateTime createTime = LocalDateTime.now(); // 생성 시간

    @Column
    @NotNull
    private Long views = 0L; //조회수

    @Column
    @NotNull
    private Long heartCount = 0L; // 좋아요 수

    // 게시물 삭제 시 DB table에서 게시물에 등록된 좋아요 개체 삭제
    @JsonIgnore
    @OneToMany
            (mappedBy="pid",cascade = CascadeType.ALL)
    List<Heart> hearts;

    public Post() {

    }

    public Post(PostDto.PostSaveDto postSaveDto) {
        this.id = 0l;
        this.title = postSaveDto.getTitle();
        this.contents = postSaveDto.getContents();
        this.writer = postSaveDto.getWriter();
        this.views = 0L;
        this.heartCount = 0L;
    }

    public void modify(PostDto.PostModifyDto postModifyDto) {
        this.id = postModifyDto.getId();
        this.title = postModifyDto.getTitle();
        this.contents = postModifyDto.getContents();
        this.writer = postModifyDto.getWriter();
    }

}
