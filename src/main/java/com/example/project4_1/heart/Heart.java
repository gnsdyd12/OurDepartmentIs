package com.example.project4_1.heart;

import com.example.project4_1.post.Post;
import com.example.project4_1.user.User;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
public class Heart {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // id 자동증가
    private long hid; // 하트번호

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post pid; // 게시물 번호

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User uid; // 유저 아이디

    public Heart() {

    }

    public void checkHeart(Post post, User user) {
        this.pid = post;
        this.uid = user;
    }
}
