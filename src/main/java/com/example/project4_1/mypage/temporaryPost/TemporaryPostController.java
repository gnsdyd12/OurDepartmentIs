package com.example.project4_1.mypage.temporaryPost;

import com.example.project4_1.SessionUser;
import com.example.project4_1.URL;
import com.example.project4_1.post.Post;
import com.example.project4_1.post.PostDto;
import com.example.project4_1.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class TemporaryPostController {
    final TemporaryPostService temporaryPostService;
    final PostService postService;
    private final HttpSession httpSession;
    URL URL = new URL();

//    @GetMapping("temporaryPost")
//    public ModelAndView temporaryPost() {
//        SessionUser user = (SessionUser) httpSession.getAttribute("user");
//        ModelAndView modelAndview = new ModelAndView();
//        List<TemporaryPostDto.TemporaryPostListDto> tempPost = temporaryPostService.findByWriter().get();
//        modelAndview.addObject("tempPost", tempPost);
//        modelAndview.setViewName("/mypage/temporary_post");
//        return modelAndview;
//    }

    @PostMapping("/temporaryPost")
    public String temporaryPost_save(TemporaryPostDto.TemporaryPostSaveDto temporaryPostSaveDto) {
        temporaryPostService.temporaryPostSave(new TemporaryPost(temporaryPostSaveDto));
        return "redirect:" + URL.getAPI_BASE_URL();
    }

    @GetMapping("continueWrite/{id}")
    public ModelAndView continueWrite(@PathVariable Long id) {
        ModelAndView modelAndview = new ModelAndView();
        TemporaryPostDto.TemporaryPostModifyDto tempPost = temporaryPostService.modifyById(id);
        modelAndview.addObject("tempPost", tempPost);
        modelAndview.setViewName("/mypage/continue_write");
        return modelAndview;
    }

    @PostMapping("continueWrite/{id}")
    public String reTemporaryPost(@PathVariable Long id, TemporaryPostDto.TemporaryPostSaveDto temporaryPostSaveDto) {
        temporaryPostService.deleteById(id);
        temporaryPostService.temporaryPostSave(new TemporaryPost(temporaryPostSaveDto));
        return "redirect:" + URL.getAPI_BASE_URL() + "/temporary_save";
    }

    @PostMapping("postComplete/{id}")
    public String postComplete(@PathVariable Long id, PostDto.PostSaveDto postSaveDto) {
        temporaryPostService.deleteById(id);
        postService.save(new Post(postSaveDto));
        return "redirect:" + URL.getAPI_BASE_URL();
    }

    /* front에 TemporaryPostList 데이터 전송 */
    @GetMapping("/api/temporaryPostList")
    public @ResponseBody
    List<TemporaryPostDto.TemporaryPostListDto> temporaryPost() {
        List<TemporaryPostDto.TemporaryPostListDto> temporaryPostList = temporaryPostService.findByWriter().get();
        return temporaryPostList;
    }
}
