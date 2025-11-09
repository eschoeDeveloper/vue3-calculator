# Vue3 Calculator

Vue3 + Vite + Pinia를 활용하여 개발한 전자 계산기 입니다.


## 🚀 주요 기능

### 📄 문서 관리
- **다양한 형식 지원**: PDF, DOCX, TXT, MD 파일 업로드
- **자동 파싱**: Apache Tika를 사용한 텍스트 추출
- **청크 분할**: 문서를 의미있는 단위로 분할
- **임베딩 생성**: 각 청크별 벡터 임베딩 자동 생성
- **문서 메타데이터**: 제목, 설명, 카테고리 관리

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
├── assets/                # 리소스
├── components/            # 컴포넌트
├── composables/           # 컴포저블 
├── router/                # 라우터
├── types/                 # Type Model
├── utils/                 # 유틸
|    └── sweetalert2/      # SweetAlert2 Composable Module
└── tests/                 # Test 파일
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

## 📈 성능 최적화

- **Reactive Programming**: WebFlux로 높은 동시성 처리
- **Connection Pooling**: Redis/PostgreSQL 연결 풀 최적화
- **Caching**: Redis 기반 캐싱으로 응답 속도 향상
- **Rate Limiting**: 과도한 요청 방지
- **Connection Timeout**: 30초 타임아웃으로 안정성 확보

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