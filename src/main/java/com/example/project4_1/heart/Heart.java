package com.example.project4_1.heart;

import com.example.project4_1.post.Post;
import com.example.project4_1.user.User;
import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
public class Heart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // id 자동증가
    private long hid; // 하트번호
    @NotNull
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post pid; // 게시물 번호
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User uid; // 유저 아이디

    public void heartclick(HeartDto.MyHeartDto myHeartDto) {
        this.hid = this.hid;
        this.pid = myHeartDto.getPid();
        this.uid = myHeartDto.getUid();
    }
}
