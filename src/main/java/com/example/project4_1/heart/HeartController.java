package com.example.project4_1.heart;

import com.example.project4_1.post.Post;
import com.example.project4_1.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class HeartController {
    final HeartService heartService;
    private final HttpSession httpSession;

    /* 좋아요 및 좋아요 취소 */
    @PostMapping("/api/heart_click")
    public void heartSave(@RequestBody HeartDto.MyHeartDto myHeartDto) {
        heartService.heartSaveAndRemove(myHeartDto);
    }

    /* 좋아요 된 게시물인지 frontend에 알림 */
    @PostMapping("/api/is_heart")
    public boolean isHeart(@RequestBody HeartDto.IsHeartDto isHeartDto) {
        Heart isHeart = heartService.findByPidAndUid(isHeartDto);
        if (isHeart == null) {
            return false;
        }
        return true;
    }
}
