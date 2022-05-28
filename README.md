# project4_1

## 개요
학생들이 과제나 학습에 유용한 정보를 자유롭게 올릴 수 있는 학습 블로그

## 목차
1. 구현 
2. 배포
3. 빌드 
4. 참고 사이트
5. 개발

### 1. 구현
- 방식
  - front-end : react.js
  - back-end : spring-boot
 - 기능
   - MAIN UI 구현
   - 로그인
   - 글쓰기(toast ui editor API 사용) - https://nhn.github.io/tui.editor/latest/
   - 야간모드
   - 게시글 추천기능
   - 학업(학년 별 포스팅 기능) / 생활(전 학년 공통) 탭 구분

### 2. 배포
AWS-EC2를 이용한 배포

### 3. 빌드
- 설치할 프로그램
  - MariaDB (Database)
  - sqlyog (Database 관리 도구)
  - intelliJ (IDE)

### 4. 참고사이트
- velog - https://velog.io/
- brunch - https://brunch.co.kr/

### 5. 개발

#### git branch 전략

> 메인 브랜치 : main, develop

> 보조 브랜치 : feature
>
> > feaure 브랜치 명명 방식은 feature/[기능이름]

> 릴리즈 브랜치 : release
>
> > dev ->release -> main

> 핫픽스 브랜치 : hotfix
>
> > main -> hotfix -> main

#### Commit, PR시
- Rule 1 : Commit양식은 아래를 따릅니다.   
- Rule 2 : 제목은 영어로, 본문은 한글로 작성하여 주세요.

```
# <타입>: <제목>

##### 제목은 최대 50 글자까지만 입력 ############## -> |


# 본문은 위에 작성
######## 본문은 한 줄에 최대 72 글자까지만 입력 ########################### -> |

# 꼬릿말은 아래에 작성: ex) #이슈 번호

# --- COMMIT END ---
# <타입> 리스트
#   feat    : 기능 (새로운 기능)
#   fix     : 버그 (버그 수정)
#   refactor: 리팩토링
#   style   : 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없음)
#   docs    : 문서 (문서 추가, 수정, 삭제)
#   test    : 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없음)
#   chore   : 기타 변경사항 (빌드 스크립트 수정 등)
# ------------------
#     제목 첫 글자를 대문자로
#     제목은 명령문으로
#     제목 끝에 마침표(.) 금지
#     제목과 본문을 한 줄 띄워 분리하기
#     본문은 "어떻게" 보다 "무엇을", "왜"를 설명한다.
#     본문에 여러줄의 메시지를 작성할 땐 "-"로 구분
# ------------------  
```

```
ex)   
docs: Update README

가독성이 더 좋은 commit 메시지로 업데이트 하였습니다.
```

#### 주석 Convention
- Rule 3 : 함수, 클래스 단위로 아래 주석 형식을 따라주세요.
	- description은 전체적인 기능, 동작이 복잡하다면 자세하게 써주세요.

```
 /**
  *@author Suin-Jeong, suin8@jbnu.ac.kr
  *@date 2022-04-13
  *@description 상단에 고정적으로 위치하는 Header
  *             로고, Main Navigator, 검색창,
  *             KR/EN 버튼, Side Navigator 포함
  */
  ```
  
- Rule 4 : 함수 안에 큰 컴포넌트 단위로 한줄주석 혹은 return문 내에 주석을 달아주세요.

```
// return 문 외
// 한줄 주석

{/* return 문 내 */}
{/* 메뉴, 검색창, 언어버튼 */}
{/* 사이드 메뉴 */}
```
