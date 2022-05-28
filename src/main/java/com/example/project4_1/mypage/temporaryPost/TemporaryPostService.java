package com.example.project4_1.mypage.temporaryPost;

import com.example.project4_1.SessionUser;
import com.example.project4_1.post.PostDto;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Service
public class TemporaryPostService {
    private final TemporaryPostRepository temporaryPostRepository;
    private final HttpSession httpSession;

    public TemporaryPostService(TemporaryPostRepository temporaryPostRepository, HttpSession httpSession) {
        this.temporaryPostRepository = temporaryPostRepository;
        this.httpSession = httpSession;
    }

    public void temporaryPostSave(TemporaryPost temporaryPost){
        temporaryPostRepository.save(temporaryPost);
    }

    public Optional<List<TemporaryPostDto.TemporaryPostListDto>> findByWriter(){
        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        return temporaryPostRepository.findByWriter(user.getName());
    }

    public TemporaryPostDto.TemporaryPostModifyDto modifyById(Long id){
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
