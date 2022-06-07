package com.example.project4_1.heart;

import com.example.project4_1.post.Post;
import com.example.project4_1.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final HttpSession httpSession;

    public void heartSaveAndRemove(HeartDto.MyHeartDto myHeartDto) {

        User uid = myHeartDto.getUid();
        Post pid = myHeartDto.getPid();

        Heart heart = new Heart();
        heart = heartRepository.findHeartByUidAndPid(uid,pid).get();

        if(heart == null) {
            heart.heartClick(myHeartDto);
            heartRepository.save(heart);
        }else{
            heartRepository.delete(heart);
        }
    }

    public Heart findByPidAndUid(HeartDto.IsHeartDto isHeartDto) {
        User uid = isHeartDto.getUid();
        Post pid = isHeartDto.getPid();
        return heartRepository.findHeartByUidAndPid(uid, pid).get();
    }
}
