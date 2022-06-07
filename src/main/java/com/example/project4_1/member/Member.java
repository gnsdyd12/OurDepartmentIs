package com.example.project4_1.member;

import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // id 자동 증가
    @Column
    private Long id;

    @Column
    @NotNull
    private String memberId;

    @Column
    @NotNull
    private String password;

    @Column
    private Integer grade;

    public Member(Long id, String memberId, String password, Integer grade) {
        this.id = id;
        this.memberId = memberId;
        this.password = password;
        this.grade = grade;
    }

}
