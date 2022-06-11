package com.example.project4_1.mypage.temporaryPost;

import com.example.project4_1.SessionUser;
import com.example.project4_1.user.User;
import com.example.project4_1.user.UserRepository;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Service
public class TemporaryPostService {

    private final TemporaryPostRepository temporaryPostRepository;
    private final HttpSession httpSession;
    private final UserRepository userRepository;

    public TemporaryPostService(TemporaryPostRepository temporaryPostRepository, HttpSession httpSession, UserRepository userRepository) {
        this.temporaryPostRepository = temporaryPostRepository;
        this.httpSession = httpSession;
        this.userRepository = userRepository;
    }

    public void temporaryPostSave(TemporaryPost temporaryPost) {
        temporaryPostRepository.save(temporaryPost);
    }

    public Optional<List<TemporaryPostDto.TemporaryPostListDto>> findByUid() {
        SessionUser sUser = (SessionUser) httpSession.getAttribute("user");
        Long sUserId = sUser.getId();
        User user = userRepository.findById(sUserId).get();
        return temporaryPostRepository.findByUid(user);
    }

    public TemporaryPostDto.TemporaryPostModifyDto modifyById(Long id) {
        Optional<TemporaryPost> temppost = temporaryPostRepository.findById(id);
        if (temppost.isEmpty()) {
            throw new RuntimeException("아이디가 없습니다");
        } else {
            return new TemporaryPostDto.TemporaryPostModifyDto(temppost.get());
        }
    }

    public void deleteById(Long id) {
        temporaryPostRepository.deleteById(id);
    }

}
