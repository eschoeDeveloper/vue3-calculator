# Vue3 Calculator

Vue3 + Vite + Pinia를 활용하여 개발한 전자 계산기 입니다.


## 🚀 주요 기능

### 📄 계산기
- **간편 기능**: 키보드 입력
- **연산**: 나머지 및 사칙연산 ( 실수 및 정수 )
- **초기화**: 계산 초기화

### ✅ To-Do
- **공학 계산**: 제곱, 제곱근, 거듭제곱, 역수, 절댓값, 지수/로그
- **고급 함수**: 삼각함수, 역삼각함수, 하이퍼볼릭 함수
- **기타** : 진법 변환, 비트 연산, 팩토리얼, 조합/순열
- **테스트** : E2E 및 기능 테스트 코드

## 🛠 기술 스택

- **Framework**: Vue3
- **Router**: Vue-Router
- **Store**: pinia
- **Build**: vite
- **Package**: yarn
- **Library**: Sweetalert2
- **Test**: vue-utils, vitest
- **Lint**: eslint

## 🚀 배포

### 로컬 실행
```bash
cd vue3-calculator # 실제 경로 맞춰서
yarn run dev
```

## 🔧 개발

### 프로젝트 구조
```
src
├── assets/               # 리소스
├── components/           # 컴포넌트
├── composables/          # 컴포저블 
├── router/               # 라우터
├── types/                # Type Model
├── utils/                # 유틸
|    └─ sweetalert2/      # SweetAlert2 Composable Module
└── tests/                # Test 파일
```

### 빌드 및 테스트
```bash
# 테스트
yarn run test # 일반 정적 실행
yarn run test:watch # watch 모드
yarn run test:ui # ui 모드

# 빌드
yarn run build

# 커버리지
yarn run coverage
```

## 📝 라이선스

Apache License

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 있으시면 이슈를 생성해주세요.