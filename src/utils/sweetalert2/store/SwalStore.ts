
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import type {
  SwalOptions,
  ToastOptions,
  ConfirmOptions,
  SwalThemes,
  SwalTypes,
  SwalConfig,
  ThemeConfig,
} from '@/utils/sweetalert2/model/SwalModel.ts';

/**
 * 테마 설정
 */
const themeConfigs: Record<SwalThemes, ThemeConfig> = {
  light: {
    background: '#ffffff',
    color: '#333333',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    borderRadius: '8px',
  },
  dark: {
    background: '#1a1a1a',
    color: '#ffffff',
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: '#f44336',
    borderRadius: '8px',
    customClass: {
      popup: 'dark-popup',
    },
  },
  modern: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    confirmButtonColor: '#ffffff',
    cancelButtonColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    customClass: {
      popup: 'modern-popup',
      confirmButton: 'modern-confirm-btn',
      cancelButton: 'modern-cancel-btn',
    },
  },
  minimal: {
    background: '#f8f9fa',
    color: '#212529',
    confirmButtonColor: '#212529',
    cancelButtonColor: '#6c757d',
    borderRadius: '4px',
    customClass: {
      popup: 'minimal-popup',
    },
  },
  colorful: {
    background: '#ffffff',
    color: '#333333',
    confirmButtonColor: '#ff6b6b',
    cancelButtonColor: '#4ecdc4',
    borderRadius: '15px',
    customClass: {
      popup: 'colorful-popup',
    },
  },
  "material-ui": {
    background: '#fafafa',
    color: '#212121',
    confirmButtonColor: '#1976d2', // MUI primary.main
    cancelButtonColor: '#9e9e9e',  // MUI grey[500]
    borderRadius: '8px',
    customClass: {
      popup: 'mui-popup',
    },
  }
};

/**
 * 타입별 아이콘 매핑
 */
const typeIconMap: Record<SwalTypes, 'success' | 'error' | 'warning' | 'info' | 'question'> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
  question: 'question',
};

export const useSwalStore = defineStore('alert', {
  state: () => ({
    config: {
      defaultTheme: 'light' as SwalThemes,
      defaultPosition: 'center' as const,
      defaultTimer: 3000,
      themes: themeConfigs,
    } as SwalConfig,
  }),

  actions: {
    /**
     * 전역 설정 업데이트
     */
    updateConfig(config: Partial<SwalConfig>) {
      this.config = { ...this.config, ...config };
    },

    /**
     * 테마 설정 가져오기
     */
    getThemeConfig(theme?: SwalThemes): ThemeConfig {
      const selectedTheme = theme || this.config.defaultTheme;
      return this.config.themes[selectedTheme];
    },

    /**
     * 기본 알림 옵션 생성
     */
    createBaseOptions(options: SwalOptions = {}): any {
      const theme = this.getThemeConfig(options.theme);
      const icon = options.type ? typeIconMap[options.type] : options.icon;

      return {
        title: options.title,
        text: options.text,
        html: options.html,
        icon,
        position: options.position || this.config.defaultPosition,
        timer: options.timer,
        background: theme.background,
        color: theme.color,
        confirmButtonColor: options.confirmButtonColor || theme.confirmButtonColor,
        cancelButtonColor: options.cancelButtonColor || theme.cancelButtonColor,
        confirmButtonText: options.confirmButtonText || '확인',
        cancelButtonText: options.cancelButtonText || '취소',
        showConfirmButton: options.showConfirmButton ?? true,
        showCancelButton: options.showCancelButton ?? false,
        allowOutsideClick: options.allowOutsideClick ?? true,
        allowEscapeKey: options.allowEscapeKey ?? true,
        backdrop: options.backdrop ?? true,
        customClass: {
          ...theme.customClass,
          ...options.customClass,
        },
        iconColor: theme.iconColor,
        borderRadius: theme.borderRadius,
      };
    },

    /**
     * 기본 알림 표시
     */
    async show(options: SwalOptions): Promise<SweetAlertResult> {
      const swalOptions = this.createBaseOptions(options);
      return await Swal.fire(swalOptions);
    },

    /**
     * Success 알림
     */
    async success(title: string, text?: string, options?: SwalOptions): Promise<SweetAlertResult> {
      return await this.show({
        title,
        text,
        type: 'success',
        ...options,
      });
    },

    /**
     * Error 알림
     */
    async error(title: string, text?: string, options?: SwalOptions): Promise<SweetAlertResult> {
      return await this.show({
        title,
        text,
        type: 'error',
        ...options,
      });
    },

    /**
     * Warning 알림
     */
    async warning(title: string, text?: string, options?: SwalOptions): Promise<SweetAlertResult> {
      return await this.show({
        title,
        text,
        type: 'warning',
        ...options,
      });
    },

    /**
     * Info 알림
     */
    async info(title: string, text?: string, options?: SwalOptions): Promise<SweetAlertResult> {
      return await this.show({
        title,
        text,
        type: 'info',
        ...options,
      });
    },

    /**
     * Question 알림
     */
    async question(title: string, text?: string, options?: SwalOptions): Promise<SweetAlertResult> {
      return await this.show({
        title,
        text,
        type: 'question',
        ...options,
      });
    },

    /**
     * Toast 알림
     */
    async toast(options: ToastOptions): Promise<SweetAlertResult> {
      const theme = this.getThemeConfig(options.theme);
      const icon = options.type ? typeIconMap[options.type] : options.icon;

      return await Swal.fire({
        toast: true,
        position: options.position || 'top-end',
        icon,
        title: options.title,
        text: options.text,
        showConfirmButton: false,
        timer: options.duration || this.config.defaultTimer,
        timerProgressBar: true,
        background: theme.background,
        color: theme.color,
        customClass: {
          ...theme.customClass,
          ...options.customClass,
        },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
    },

    /**
     * Success Toast
     */
    async toastSuccess(title: string, options?: ToastOptions): Promise<SweetAlertResult> {
      return await this.toast({
        title,
        type: 'success',
        ...options,
      });
    },

    /**
     * Error Toast
     */
    async toastError(title: string, options?: ToastOptions): Promise<SweetAlertResult> {
      return await this.toast({
        title,
        type: 'error',
        ...options,
      });
    },

    /**
     * Warning Toast
     */
    async toastWarning(title: string, options?: ToastOptions): Promise<SweetAlertResult> {
      return await this.toast({
        title,
        type: 'warning',
        ...options,
      });
    },

    /**
     * Info Toast
     */
    async toastInfo(title: string, options?: ToastOptions): Promise<SweetAlertResult> {
      return await this.toast({
        title,
        type: 'info',
        ...options,
      });
    },

    /**
     * Confirm 다이얼로그
     */
    async confirm(options: ConfirmOptions): Promise<boolean> {
      const result = await this.show({
        ...options,
        showCancelButton: true,
        type: options.type || 'question',
      });

      if (result.isConfirmed && options.onConfirm) {
        await options.onConfirm();
      }

      if (result.isDismissed && options.onCancel) {
        await options.onCancel();
      }

      return result.isConfirmed;
    },

    /**
     * 삭제 확인 다이얼로그
     */
    async confirmDelete(title?: string, text?: string, options?: ConfirmOptions): Promise<boolean> {
      return await this.confirm({
        title: title || '정말 삭제하시겠습니까?',
        text: text || '이 작업은 되돌릴 수 없습니다.',
        type: 'warning',
        confirmButtonText: '삭제',
        confirmButtonColor: '#d33',
        ...options,
      });
    },

    /**
     * 로딩 표시
     */
    showLoading(title?: string, text?: string) {
      Swal.fire({
        title: title || '처리중...',
        text: text || '잠시만 기다려주세요.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    },

    /**
     * 로딩 닫기
     */
    closeLoading() {
      Swal.close();
    },

    /**
     * 모든 알림 닫기
     */
    closeAll() {
      Swal.close();
    },

    /**
     * 커스텀 테마 추가
     */
    addCustomTheme(name: string, config: ThemeConfig) {
      this.config.themes[name as SwalThemes] = config;
    },
  },
});