package com.example.project4_1.heart;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class HeartController {
    final HeartService heartService;
    private final HttpSession httpSession;


    @PostMapping("/api/heart_click")
    public String heartsave(@RequestBody HeartDto.MyHeartDto myHeartDto){
        heartService.heartsave(myHeartDto);
        return "redirect:/";
    }
}
