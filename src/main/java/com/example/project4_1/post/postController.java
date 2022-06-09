package com.example.project4_1.post;

import com.example.project4_1.SessionUser;
import com.example.project4_1.URL;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class postController {

    final PostService postService;
    private final HttpSession httpSession;

    URL URL = new URL();

    // write 데이터 처리 (post mapping)
    @PostMapping("/postdata")
    public String savePost(PostDto.PostSaveDto postSaveDto) {
        postService.save(new Post(postSaveDto));
        return "redirect:" + URL.getAPI_BASE_URL();
    }

    // list page
    @RequestMapping(value = "/", method = {RequestMethod.GET, RequestMethod.POST})
    public ModelAndView index(ModelAndView modelAndView) {
        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        if (user != null) {
            modelAndView.addObject("user", user);
        }
        modelAndView.addObject("post", postService.findByAll());
        modelAndView.setViewName("index");
        return modelAndView;
    }

    // write 페이지
    @GetMapping("write_post")
    public ModelAndView writePost(ModelAndView modelAndView) {
        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        if (user != null) {
            modelAndView.addObject("user", user);
        }
        modelAndView.setViewName("post/write_post");
        return modelAndView;
    }

    // 게시글 본문
    @GetMapping("view_post/{id}")
    public ModelAndView viewpost(@PathVariable Long id) {
        Optional<PostDto.PostDetailDto> post = postService.findById(id);
        postService.viewCount(id);
        ModelAndView modelAndView = new ModelAndView();
        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        modelAndView.addObject("user", user);
        modelAndView.addObject("post", post.get());
        modelAndView.setViewName("post/view_post");
        return modelAndView;
    }

    @GetMapping("delete_post/{id}")
    public String deletePost(@PathVariable Long id) {
        postService.deleteById(id);
        return "redirect:" + URL.getAPI_BASE_URL();
    }

    @GetMapping("modify_post/{id}")
    public ModelAndView modifyPost(@PathVariable Long id) {
        Optional<PostDto.PostModifyDto> post = postService.modifyById(id);
        ModelAndView modelAndview = new ModelAndView();
        modelAndview.addObject("post", post.get());
        modelAndview.setViewName("post/modify_post");
        return modelAndview;
    }

    @PostMapping("/modify_post/{id}")
    public String modifyPost(PostDto.PostModifyDto postModifyDto) {
        postService.modify(postModifyDto);
        return "redirect:" + URL.getAPI_BASE_URL();
    }

    // front에 PostListDto 데이터 전송
    @GetMapping("/api/postList")
    public @ResponseBody
    List<PostDto.PostListDto> postList() {
        List<PostDto.PostListDto> postList = postService.findByAll();
        return postList;
    }

    // front에 PostDetailDto 데이터 전송
    @PostMapping("/api/view_post/{id}")
    public @ResponseBody
    PostDto.PostDetailDto postDetail(@PathVariable Long id) {
        Optional<PostDto.PostDetailDto> postDetail = postService.findById(id);
        postService.viewCount(id);
        return postDetail.get();
    }

    // front에 로그인 정보 전송
    @PostMapping("/api/loginInfo")
    public @ResponseBody
    SessionUser user() {
        SessionUser user = (SessionUser) httpSession.getAttribute("user");
        return user;
    }
    
}
