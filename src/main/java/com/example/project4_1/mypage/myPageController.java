package com.example.project4_1.mypage;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class myPageController {

    @GetMapping("/mainpage")
    public String mainpage() {
        return "mypage/main_page";
    }

    @GetMapping("/favoritePost")
    public String favoritePost() {
        return "mypage/favorite_post";
    }

    @GetMapping("/myInfo")
    public String myInfo() {
        return "mypage/my_info";
    }

}
