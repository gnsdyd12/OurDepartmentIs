package com.example.project4_1.user;

import com.example.project4_1.heart.Heart;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @Column
    @NotNull
    private String name;
    @Column
    @NotNull
    private String email;
    @Column
    private String picture;
    @Enumerated(EnumType.STRING)
    @Column
    @NotNull
    private Role role;

    // 사용자 삭제 시 DB table에서 사용자가 등록한 좋아요 개체 삭제
    @JsonIgnore
    @OneToMany
            (mappedBy="uid",cascade = CascadeType.ALL)
    List<Heart> hearts;

    @Builder
    public User(Long id, String name, String email, String picture, Role role) {
        this.Id=id;
        this.name = name;
        this.email = email;
        this.picture = picture;
        this.role = role;
    }

    public User update(String name, String picture) {
        this.name = name;
        this.picture = picture;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }


}