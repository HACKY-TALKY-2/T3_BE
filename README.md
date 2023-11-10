# T3_BE

Team 3의 백엔드 프로젝트입니다.
OpenAI GPT-4 Turbo와 Whisper를 사용해, 당신에게 지금 필요한 변명을 만들어드립니다.
오늘도 무사히 보내세요.

## Depolyment

**연약한 개인 서버(데스크톱과 Cloudflare tunnel..)에 배포되어 있습니다! 착하게 다뤄주세요!**

- [API 서버 - https://excuse.withsang.com/](https://excuse.withsang.com/)
- [API 문서 - https://excuse.withsang.com/docs](https://excuse.withsang.com/docs)

## Functions

- [x] 변명 생성
- [x] 변명 텍스트를 바탕으로 성대모사 음성 생성

## Dependencies

- Node.js(^18.0.0), pnpm(^8.0.0)
  - fnm, nvm과 같은 Node.js 가상환경 사용을 추천드립니다.
- MongoDB(>= 5.0.0)
  - 프롬프트/결과 텍스트 기록용으로 사용합니다.
- AWS S3
  - 변명 텍스트를 바탕으로 생성한 음성을 저장하기 위해 사용합니다.
- Docker
  - 배포용으로 Dockerhub에 이미지가 배포되어 있습니다([withsang/t3-excuse 이미지](https://hub.docker.com/repository/docker/withsang/t3-excuse))

## Project Setup

1. 레포 클론
    ```bash
    git clone https://github.com/HACKY-TALKY-2/T3_BE
    ```
2. 의존성 설치
    ```bash
    fnm use
    pnpm install
    ```
3. 환경변수 설정: `.env.example`을 참고하여 `.env.development` 파일을 생성하고, 필요한 환경변수를 입력합니다.
    ```bash
    cp .env.example .env.development
    code .env.development
    ```
4. 서버 시작
   ```bash
   # development 빌드. HMR을 지원합니다.
   pnpm start
   
   # production 빌드.
   pnpm build
   pnpm prod
   ```
