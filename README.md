# OurDepartmentIs
- 학생들이 과제나 학습에 유용한 정보를 자유롭게 올릴 수 있는 학습 블로그 - http://ourdepartmentis.site

## 포트폴리오
- (back-end 담당 훈용) [OurDepartmentIs_포트폴리오.pdf](https://github.com/gnsdyd12/OurDepartmentIs/files/10529336/OurDepartmentIs.pdf)
- (front-end 담당 은상) [OurDepartmentIs 포트폴리오.notion](https://melted-attic-da8.notion.site/f0464ceeeb5c4e08bb40f1694230cb90?pvs=4), [배포 과정 기록.velog](https://velog.io/@dmstkd2905/series/aws-ec2-서버에-react-spring-프로젝트-배포하기)

## 개발 환경
- java 11
- spring boot
- mariadb
- react 18

## local 개발 환경 setting

### 1. 프로그램 설치
- IDE
    - visual studio code
    - intelliJ (ultimate version)
- git
- node.js
- java 11
- mariadb

### 2. repository clone
- repository clone

### 3. 의존성 파일 다운로드
[backend]
- 최상위 폴더 경로에서
    - *build.gradle* 파일 작성
        ```
        plugins {
            id 'org.springframework.boot' version '2.6.3'
            id 'io.spring.dependency-management' version '1.0.11.RELEASE'
            id 'java'
        }
        
        group = 'com.example'
        version = '0.0.1-SNAPSHOT'
        sourceCompatibility = '11'
        
        configurations {
            compileOnly {
                extendsFrom annotationProcessor
            }
        }
        
        repositories {
            mavenCentral()
        }
        
        dependencies {
            implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
            implementation 'org.springframework.boot:spring-boot-starter-web'
            implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
            implementation 'org.springframework.boot:spring-boot-starter-security'
            compileOnly 'org.projectlombok:lombok'
            annotationProcessor 'org.projectlombok:lombok'
            testImplementation 'org.springframework.boot:spring-boot-starter-test'
            implementation 'org.thymeleaf.extras:thymeleaf-extras-springsecurity5'
            implementation 'org.springframework.boot:spring-boot-starter-oauth2-client' // social_login
            runtimeOnly 'org.mariadb.jdbc:mariadb-java-client:2.7.4' // database
            implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:2.2.0'
            implementation 'org.apache.tomcat:tomcat-jdbc:9.0.54'
        }
        
        tasks.named('test') {
            useJUnitPlatform()
        }
        ```
        
    - *settings.gradle* 파일 작성   
        ```
        rootProject.name= 'OurDepartmentIs'
        ```
        
- src → main → resources 폴더 경로로 이동
    - *application.yml* 파일 작성
        ```
        spring:
          thymeleaf:
            prefix: classpath:/templates/
          datasource:
            driver-class-name: org.mariadb.jdbc.Driver
            url: jdbc:mariadb://localhost:3306/[DB명]?autoReconnect=true&characterEncoding=utf8&tcpNoDelay=true&socketTimeout=7000&serverTimezone=UTC
            username: root
            password: [비밀번호]
          jpa:
            show-sql: true
            hibernate:
              ddl-auto: update
          security:
            user:
              name: user
              password: [비밀번호]
            oauth2:
              client:
                registration:
                  google:
                    redirect-uri: http://localhost:8080/login/oauth2/code/google
          profiles:
            include: oauth
        ```
        
    - *application-oauth.properties* 파일 작성
        ```
        spring.security.oauth2.client.registration.google.client-id=[client_id]
        spring.security.oauth2.client.registration.google.client-secret=[client_secret]
        spring.security.oauth2.client.registration.google.scope=profile,email
        ```
        

- 💡 주의!
    - 빌드 과정에서 .iml 파일이 생성됐다면 반드시 삭제
    - 프로젝트 구조, 빌드 도구 등에서 java 11 버전이 적용되었는지 확인
    - *application.yml* 파일에 명시한 이름(DB명) 그대로 데이터베이스 생성

[frontend]
1. frontend 폴더로 경로 이동 (`cd frontend`)
2. `npm i -legacy-peer-deps` 입력

### 4. 실행하기
[backend]
- gradle 변경 적용 후 실행

[frontend]
- frontend 폴더로 이동하여 `npm start`
