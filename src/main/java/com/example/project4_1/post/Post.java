package com.example.project4_1.post;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
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
    private LocalDateTime create_time = LocalDateTime.now(); // 생성 시간

    @Column
    private Long views = 0L; //조회수

    public Post() {

    }

    public Post(PostDto.PostSaveDto postSaveDto) {
        this.id = 0l;
        this.title = postSaveDto.getTitle();
        this.contents = postSaveDto.getContents();
        this.writer = postSaveDto.getWriter();
        this.views = 0L;
    }

    public void modify(PostDto.PostModifyDto postModifyDto) {
        this.id = postModifyDto.getId();
        this.title = postModifyDto.getTitle();
        this.contents = postModifyDto.getContents();
        this.writer = postModifyDto.getWriter();
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public LocalDateTime getCreate_time() {
        return create_time;
    }

    public void setCreate_time(LocalDateTime create_time) {
        this.create_time = create_time;
    }

    public Long getViews() {
        return views;
    }

    public void setViews(Long views) {
        this.views = views;
    }

}
