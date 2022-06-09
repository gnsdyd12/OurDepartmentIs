package com.example.project4_1.heart;

import com.example.project4_1.SessionUser;
import com.example.project4_1.post.Post;
import com.example.project4_1.post.PostRepo;
import com.example.project4_1.user.User;
import com.example.project4_1.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
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

        Optional<Heart> heart = heartRepository.findByUidAndPid(user, post);

        Heart newHeart = new Heart();
        newHeart.checkHeart(post, user);

        if (heart.isEmpty()) {
            heartRepository.save(newHeart);
            return true;
        } else {
            Heart deleteHeart = heart.get();
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

    // DB Heart table에서 user의 좋아요 게시물을 모두 조회 후 List로 반환
    public List<Post> findHeartList() {
        SessionUser sUser = (SessionUser) httpSession.getAttribute("user");
        Long sUserId = sUser.getId();
        User user = userRepository.findById(sUserId).get();
        List<Heart> heart = heartRepository.findAllByUid(user).get();
        List<Post> postList = new ArrayList<>();
        for (int i = 0; i < heart.size(); i++) {
            Post post = heart.get(i).getPid();
            postList.add(post);
        }
        return postList;
    }
}
