package com.example.project4_1.heart;

import com.example.project4_1.post.Post;
import com.example.project4_1.post.PostRepo;
import com.example.project4_1.user.User;
import com.example.project4_1.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final UserRepository userRepository;
    private final PostRepo postRepository;
    private final HttpSession httpSession;

    public boolean heartSaveAndRemove(HeartDto.MyHeartDto myHeartDto) {

        Long uid = myHeartDto.getUid();
        Long pid = myHeartDto.getPid();

        User user = userRepository.findById(uid).get();
        Post post = postRepository.findById(pid).get();

        //Heart heart = new Heart();
        Optional<Heart> heart = heartRepository.findByUidAndPid(user, post);

        Heart newHeart = new Heart();
        newHeart.checkHeart(post,user);

        if (heart.isEmpty()) {
            heartRepository.save(newHeart);
            return true;
        } else {
            Heart deleteHeart= heart.get();
            heartRepository.delete(deleteHeart);
            return false;
        }
    }

    public Heart findByPidAndUid(HeartDto.IsHeartDto isHeartDto) {

        Long uid = isHeartDto.getUid();
        Long pid = isHeartDto.getPid();

        User user = userRepository.findById(uid).get();
        Post post = postRepository.findById(pid).get();
        Optional<Heart> heart = heartRepository.findByUidAndPid(user, post);
        if (heart.isEmpty()) return null;
        else return heart.get();
    }
}
