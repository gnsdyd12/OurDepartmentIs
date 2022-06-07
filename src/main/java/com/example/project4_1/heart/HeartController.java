package com.example.project4_1.heart;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class HeartController {

    final HeartService heartService;
    private final HttpSession httpSession;

    // 좋아요, 좋아요 취소 기능 함수
    @PostMapping("/api/heart_click")
    public boolean heartSave(@RequestBody HeartDto.MyHeartDto myHeartDto) {
        myHeartDto.getPid();
        myHeartDto.getUid();
        boolean check = heartService.heartSaveAndRemove(myHeartDto);
        return check;
    }

    // 게시물의 좋아요 여부를 frontend에 전송하는 함수
    @PostMapping("/api/is_heart")
    public boolean isHeart(@RequestBody HeartDto.IsHeartDto isHeartDto) {
        Heart isHeart = heartService.findByPidAndUid(isHeartDto);

        if (isHeart == null) {
            return false;
        } else {
            return true;
        }
    }

}
