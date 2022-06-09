package com.example.project4_1.post;

import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepo postRepo;

    public PostService(PostRepo postRepo) {
        this.postRepo = postRepo;
    }

    public void save(Post post) {
        postRepo.save(post);
    }


    public List<PostDto.PostListDto> findByAll() {
        return postRepo.findAllByIdIsNotNull();
    }

    public Optional<PostDto.PostDetailDto> findById(Long id) {
        Optional<Post> post = postRepo.findById(id);
        if (post.isEmpty()) {
            throw new RuntimeException("아이디가 없습니다");
        } else {
            return Optional.of(new PostDto.PostDetailDto(post.get()));
        }
    }

    public Optional<PostDto.PostModifyDto> modifyById(Long id) {
        Optional<Post> post = postRepo.findById(id);
        if (post.isEmpty()) {
            throw new RuntimeException("아이디가 없습니다");
        } else {
            return Optional.of(new PostDto.PostModifyDto(post.get()));
        }
    }

    public void deleteById(Long id) {
        postRepo.deleteById(id);
    }

    public void modify(PostDto.PostModifyDto postModifyDto) {
        Optional<Post> post = postRepo.findById(postModifyDto.getId());
        post.ifPresent(m->{
            m.modify(postModifyDto);
            postRepo.save(m);
        });
    }

    public void viewCount(Long id) {
        Optional<Post> post = postRepo.findById(id);
        post.ifPresent(m -> {
            m.setViews(m.getViews() + 1L);
            postRepo.save(m);
        });
    }

    public void heartPlus(Long id){
        Optional<Post> post = postRepo.findById(id);
        post.ifPresent(m -> {
            m.setHeartCount(m.getHeartCount() + 1L);
            postRepo.save(m);
        });
    }

    public void heartMinus(Long id){
        Optional<Post> post = postRepo.findById(id);
        post.ifPresent(m -> {
            m.setHeartCount(m.getHeartCount() - 1L);
            postRepo.save(m);
        });
    }

}
