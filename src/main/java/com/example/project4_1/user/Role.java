package com.example.project4_1.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    Guest("ROLE_GUEST", "손님"),
    USER("ROLE_USER","유저");

    private final String key;
    private final String title;

}
