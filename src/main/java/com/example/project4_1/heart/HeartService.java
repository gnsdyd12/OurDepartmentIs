package com.example.project4_1.heart;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final HttpSession httpSession;

    public void heartsave(HeartDto.MyHeartDto myHeartDto) {

        // 이미 좋아요 된 캠페인일 경우 409 에러
//        if (findHeartWithUserAndCampaignId(heartDto).isPresent())
//            throw new CustomException(ALREADY_HEARTED);

        Heart heart = new Heart();
        heart.heartclick(myHeartDto);
        heartRepository.save(heart);
    }
}
