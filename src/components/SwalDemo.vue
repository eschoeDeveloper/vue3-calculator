<template>
  <div class="alert-demo">
    <!-- 테마 선택 -->
    <div class="theme-selector">
      <h2>테마 선택</h2>
      <div class="button-group">
        <button @click="currentTheme = 'light'">Light</button>
        <button @click="currentTheme = 'dark'">Dark</button>
        <button @click="currentTheme = 'modern'">Modern</button>
        <button @click="currentTheme = 'minimal'">Minimal</button>
        <button @click="currentTheme = 'colorful'">Colorful</button>
      </div>
      <p>현재 테마: <strong>{{ currentTheme }}</strong></p>
    </div>

    <!-- 기본 알림 -->
    <section>
      <h2>기본 알림</h2>
      <div class="button-group">
        <button @click="showSuccess" class="btn-success">Success</button>
        <button @click="showError" class="btn-error">Error</button>
        <button @click="showWarning" class="btn-warning">Warning</button>
        <button @click="showInfo" class="btn-info">Info</button>
        <button @click="showQuestion" class="btn-question">Question</button>
      </div>
    </section>

    <!-- Toast 알림 -->
    <section>
      <h2>Toast 알림</h2>
      <div class="button-group">
        <button @click="showToastSuccess" class="btn-success">Toast Success</button>
        <button @click="showToastError" class="btn-error">Toast Error</button>
        <button @click="showToastWarning" class="btn-warning">Toast Warning</button>
        <button @click="showToastInfo" class="btn-info">Toast Info</button>
      </div>
    </section>

    <!-- Confirm 다이얼로그 -->
    <section>
      <h2>Confirm 다이얼로그</h2>
      <div class="button-group">
        <button @click="showConfirm">기본 Confirm</button>
        <button @click="showConfirmDelete" class="btn-error">삭제 Confirm</button>
        <button @click="showCustomConfirm">커스텀 Confirm</button>
      </div>
    </section>

    <!-- 로딩 -->
    <section>
      <h2>로딩</h2>
      <div class="button-group">
        <button @click="showLoadingDemo">로딩 표시 (3초)</button>
      </div>
    </section>

    <!-- 고급 기능 -->
    <section>
      <h2>고급 기능</h2>
      <div class="button-group">
        <button @click="showHtmlContent">HTML 컨텐츠</button>
        <button @click="showAutoClose">자동 닫기 (3초)</button>
        <button @click="showPositionDemo">위치 변경</button>
      </div>
    </section>

    <!-- 테마별 알림 -->
    <section>
      <h2>테마별 알림 테스트</h2>
      <div class="button-group">
        <button @click="testAllThemes">모든 테마 테스트</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

import { useSwal, useThemedSwal } from '@/utils/sweetalert2/composable/SwalModule.ts';
import type { SwalThemes } from '@/utils/sweetalert2/model/SwalModel.ts';

const _Swal = useSwal();
const currentTheme = ref<SwalThemes>('light');

// 기본 알림
const showSuccess = () => {
  _Swal.success('성공!', '작업이 성공적으로 완료되었습니다.', {
    theme: currentTheme.value,
  });
};

const showError = () => {
  _Swal.error('오류 발생', '문제가 발생했습니다. 다시 시도해주세요.', {
    theme: currentTheme.value,
  });
};

const showWarning = () => {
  _Swal.warning('경고', '주의가 필요한 작업입니다.', {
    theme: currentTheme.value,
  });
};

const showInfo = () => {
  _Swal.info('안내', '유용한 정보를 제공합니다.', {
    theme: currentTheme.value,
  });
};

const showQuestion = () => {
  _Swal.question('질문', '계속 진행하시겠습니까?', {
    theme: currentTheme.value,
  });
};

// Toast 알림
const showToastSuccess = () => {
  _Swal.toastSuccess('저장되었습니다!', {
    theme: currentTheme.value,
    position: 'top-end',
  });
};

const showToastError = () => {
  _Swal.toastError('저장에 실패했습니다!', {
    theme: currentTheme.value,
    position: 'top-end',
  });
};

const showToastWarning = () => {
  _Swal.toastWarning('경고 메시지입니다!', {
    theme: currentTheme.value,
    position: 'top-end',
  });
};

const showToastInfo = () => {
  _Swal.toastInfo('정보 알림입니다!', {
    theme: currentTheme.value,
    position: 'top-end',
  });
};

// Confirm 다이얼로그
const showConfirm = async () => {
  const result = await _Swal.confirm({
    title: '확인',
    text: '이 작업을 진행하시겠습니까?',
    theme: currentTheme.value,
    onConfirm: () => {
      _Swal.toastSuccess('확인되었습니다!');
    },
    onCancel: () => {
      _Swal.toastInfo('취소되었습니다.');
    },
  });
};

const showConfirmDelete = async () => {
  const result = await _Swal.confirmDelete(
    '정말 삭제하시겠습니까?',
    '이 작업은 되돌릴 수 없습니다.',
    {
      theme: currentTheme.value,
      onConfirm: async () => {
        _Swal.showLoading('삭제중...');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        _Swal.closeLoading();
        _Swal.toastSuccess('삭제되었습니다!');
      },
    }
  );
};

const showCustomConfirm = async () => {
  const result = await _Swal.confirm({
    title: '프리미엄 업그레이드',
    text: '프리미엄 플랜으로 업그레이드하시겠습니까?',
    theme: currentTheme.value,
    confirmButtonText: '업그레이드',
    cancelButtonText: '나중에',
    onConfirm: () => {
      _Swal.success('업그레이드 완료!', '프리미엄 기능을 이용할 수 있습니다.');
    },
  });
};

// 로딩
const showLoadingDemo = async () => {
  _Swal.showLoading('처리중...', '잠시만 기다려주세요.');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  _Swal.closeLoading();
  _Swal.success('완료!', '작업이 완료되었습니다.', {
    theme: currentTheme.value,
  });
};

// 고급 기능
const showHtmlContent = () => {
  _Swal.show({
    title: 'HTML 컨텐츠',
    html: `
      <div style="text-align: left;">
        <h3 style="color: #3085d6;">기능 목록</h3>
        <ul>
          <li>✅ 다양한 테마 지원</li>
          <li>✅ Toast 알림</li>
          <li>✅ Confirm 다이얼로그</li>
          <li>✅ 로딩 표시</li>
          <li>✅ 커스터마이징 가능</li>
        </ul>
      </div>
    `,
    theme: currentTheme.value,
  });
};

const showAutoClose = () => {
  _Swal.success('자동 닫기', '3초 후 자동으로 닫힙니다.', {
    theme: currentTheme.value,
    timer: 3000,
    timerProgressBar: true,
  } as any);
};

const showPositionDemo = async () => {
  const positions = ['top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end'] as const;
  
  for (const position of positions) {
    await _Swal.info('위치 테스트', `현재 위치: ${position}`, {
      theme: currentTheme.value,
      position,
      timer: 1000,
      showConfirmButton: false,
    });
  }
};

// 모든 테마 테스트
const testAllThemes = async () => {
  const themes: SwalThemes[] = ['light', 'dark', 'modern', 'minimal', 'colorful'];
  
  for (const theme of themes) {
    await _Swal.success(`${theme.toUpperCase()} 테마`, '테마 미리보기', {
      theme,
      timer: 2000,
    });
  }
};
</script>

<style scoped>
.alert-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

h2 {
  color: #555;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

section {
  margin-bottom: 50px;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 12px;
}

.theme-selector {
  background: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  background: #3085d6;
  color: white;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

button:active {
  transform: translateY(0);
}

.btn-success {
  background: #4caf50;
}

.btn-error {
  background: #f44336;
}

.btn-warning {
  background: #ff9800;
}

.btn-info {
  background: #2196f3;
}

.btn-question {
  background: #9c27b0;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>