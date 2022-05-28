package com.example.project4_1;

import com.example.project4_1.member.MyLoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {



    private final CustomOAuth2UserService customOAuth2UserService;
    private final UserDetailsService userDetailsService;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/write_post","/mypage/**").hasRole("USER")
//                .antMatchers("/**").authenticated()
//                .and()
//                .formLogin()
//                .loginPage("/member/login")
//                .loginProcessingUrl("/member/doLogin")
//                .usernameParameter("id")
//                .passwordParameter("pw")
//                .successHandler(new MyLoginSuccessHandler())
                .and()
                .logout()
                .logoutSuccessUrl("/")
                .and()
                .oauth2Login()
//                .loginPage("/loginForm")		// 인증이 필요한 URL에 접근하면 /loginForm으로 이동
                .defaultSuccessUrl("/")			// 로그인 성공하면 "/" 으로 이동
//                .failureUrl("/loginForm")		// 로그인 실패 시 /loginForm으로 이동
                .userInfoEndpoint()
                .userService(customOAuth2UserService);

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/templates/**");
    }
}
