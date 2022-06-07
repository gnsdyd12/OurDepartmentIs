package com.example.project4_1.heart;

import com.example.project4_1.post.Post;
import com.example.project4_1.user.User;

import javax.persistence.*;

@Entity
public class Heart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // id 자동 증가
    private long hid; // 하트번호

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post pid; // 게시물 번호

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User uid; // 사용자 아이디

    public Heart() {

    }

    public void checkHeart(Post post, User user) {
        this.pid = post;
        this.uid = user;
    }

}
