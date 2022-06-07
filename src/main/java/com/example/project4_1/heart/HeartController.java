package com.example.project4_1.heart;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class HeartController {
    final HeartService heartService;
    private final HttpSession httpSession;

    @PostMapping("/heart_click")
    public String heartsave(HeartDto.MyHeartDto myHeartDto){
        heartService.heartsave(myHeartDto);
        return "redirect:/";
    }
}
