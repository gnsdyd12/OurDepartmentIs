package com.example.project4_1.mypage.temporaryPost;

import com.example.project4_1.SessionUser;
import com.example.project4_1.URL;
import com.example.project4_1.post.Post;
import com.example.project4_1.post.PostDto;
import com.example.project4_1.post.PostService;
import com.example.project4_1.user.User;
import com.example.project4_1.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.persistence.criteria.Fetch;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class TemporaryPostController {

    final TemporaryPostService temporaryPostService;
    final PostService postService;
    private final HttpSession httpSession;
    private final UserRepository userRepository;
    URL URL = new URL();



    @PostMapping("/temporaryPost")
    public String temporaryPost_save(TemporaryPostDto.TemporaryPostSaveDto temporaryPostSaveDto) {
        SessionUser sUser = (SessionUser)httpSession.getAttribute("user");
        Long sUserId = sUser.getId();
        User user = userRepository.findById(sUserId).get();
        temporaryPostSaveDto.setUid(user);
        temporaryPostService.temporaryPostSave(new TemporaryPost(temporaryPostSaveDto));
        return "redirect:" + URL.getAPI_BASE_URL();
    }

    @GetMapping("continueWrite/{id}")
    public ModelAndView continueWrite(@PathVariable Long id) {
        ModelAndView modelAndview = new ModelAndView();
        TemporaryPostDto.TemporaryPostModifyDto tempPost = temporaryPostService.modifyById(id);
        modelAndview.addObject("tempPost", tempPost);
        modelAndview.setViewName("mypage/continue_write");
        return modelAndview;
    }

    @PostMapping("continueWrite/{id}")
    public String reTemporaryPost(@PathVariable Long id, TemporaryPostDto.TemporaryPostSaveDto temporaryPostSaveDto) {
        temporaryPostService.deleteById(id);
        SessionUser sUser = (SessionUser)httpSession.getAttribute("user");
        Long sUserId = sUser.getId();
        User user = userRepository.findById(sUserId).get();
        temporaryPostSaveDto.setUid(user);
        temporaryPostService.temporaryPostSave(new TemporaryPost(temporaryPostSaveDto));
        return "redirect:" + URL.getAPI_BASE_URL() + "/temporary_save";
    }

    @PostMapping("postComplete/{id}")
    public String postComplete(@PathVariable Long id, PostDto.PostSaveDto postSaveDto) {
        temporaryPostService.deleteById(id);
        SessionUser sUser = (SessionUser)httpSession.getAttribute("user");
        Long sUserId = sUser.getId();
        User user = userRepository.findById(sUserId).get();
        postSaveDto.setUid(user);
        postService.save(new Post(postSaveDto));
        return "redirect:" + URL.getAPI_BASE_URL();
    }

    // front에 TemporaryPostList 데이터 전송
    @GetMapping("/api/temporaryPostList")
    public @ResponseBody
    List<TemporaryPostDto.TemporaryPostListDto> temporaryPost() {
        List<TemporaryPostDto.TemporaryPostListDto> temporaryPostList = temporaryPostService.findByUid().get();
        return temporaryPostList;
    }

}
