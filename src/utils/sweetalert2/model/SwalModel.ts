import type { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

export type SwalTypes = 'success' | 'error' | 'warning' | 'info' | 'question';
export type SwalThemes = 'light' | 'dark' | 'modern' | 'minimal' | 'colorful' | 'material-ui';
export type SwalPosition = SweetAlertPosition;
export type SwalAlertIcon = SweetAlertIcon;

export interface SwalOptions {
  title?: string;
  text?: string;
  html?: string;
  icon?: SweetAlertIcon;
  type?: SwalTypes;
  theme?: SwalThemes;
  position?: SwalPosition;
  timer?: number;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  backdrop?: boolean | string;
  customClass?: {
    container?: string;
    popup?: string;
    header?: string;
    title?: string;
    closeButton?: string;
    icon?: string;
    image?: string;
    content?: string;
    htmlContainer?: string;
    input?: string;
    actions?: string;
    confirmButton?: string;
    cancelButton?: string;
    footer?: string;
  };
}

/**
 * 테마 설정
 */
export interface ThemeConfig {
  background: string;
  color: string;
  confirmButtonColor: string;
  cancelButtonColor: string;
  iconColor?: string;
  borderRadius?: string;
  customClass?: SwalOptions['customClass'];
}

/**
 * Toast 알림 옵션
 */
export interface ToastOptions extends Omit<SwalOptions, 'showConfirmButton' | 'showCancelButton'> {
  duration?: number;
}

/**
 * Confirm 다이얼로그 옵션
 */
export interface ConfirmOptions extends SwalOptions {
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

/**
 * 전역 설정
 */
export interface SwalConfig {
  defaultTheme: SwalThemes;
  defaultPosition: SwalPosition;
  defaultTimer: number;
  themes: Record<SwalThemes, ThemeConfig>;
}



