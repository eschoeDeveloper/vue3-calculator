import { useSwalStore } from '@/utils/sweetalert2/store/SwalStore.ts';
import type {
  SwalOptions,
  ToastOptions,
  ConfirmOptions,
  SwalThemes,
  ThemeConfig,
} from '@/utils/sweetalert2/model/SwalModel.ts';

/**
 * Alert Composable
 * SweetAlert2 기능을 쉽게 사용할 수 있는 컴포저블
 */
export function useSwal() {
  const swalStore = useSwalStore();

  return {
  
    // 기본 알림
    show: (options: SwalOptions) => swalStore.show(options),
    
    // 타입별 알림
    success: (title: string, text?: string, options?: SwalOptions) =>
      swalStore.success(title, text, options),
    
    error: (title: string, text?: string, options?: SwalOptions) =>
      swalStore.error(title, text, options),
    
    warning: (title: string, text?: string, options?: SwalOptions) =>
      swalStore.warning(title, text, options),
    
    info: (title: string, text?: string, options?: SwalOptions) =>
      swalStore.info(title, text, options),
    
    question: (title: string, text?: string, options?: SwalOptions) =>
      swalStore.question(title, text, options),

    // Toast 알림
    toast: (options: ToastOptions) => swalStore.toast(options),
    
    toastSuccess: (title: string, options?: ToastOptions) =>
      swalStore.toastSuccess(title, options),
    
    toastError: (title: string, options?: ToastOptions) =>
      swalStore.toastError(title, options),
    
    toastWarning: (title: string, options?: ToastOptions) =>
      swalStore.toastWarning(title, options),
    
    toastInfo: (title: string, options?: ToastOptions) =>
      swalStore.toastInfo(title, options),

    // Confirm 다이얼로그
    confirm: (options: ConfirmOptions) => swalStore.confirm(options),
    
    confirmDelete: (title?: string, text?: string, options?: ConfirmOptions) =>
      swalStore.confirmDelete(title, text, options),

    // 로딩
    showLoading: (title?: string, text?: string) =>
      swalStore.showLoading(title, text),
    
    closeLoading: () => swalStore.closeLoading(),

    // 유틸리티
    closeAll: () => swalStore.closeAll(),
    
    updateConfig: (config: any) => swalStore.updateConfig(config),
    
    addCustomTheme: (name: string, config: ThemeConfig) =>
      swalStore.addCustomTheme(name, config),
  };
}

/**
 * 테마별 Alert Composable
 */
export function useThemedSwal(theme: SwalThemes) {

  const swalAlert = useSwal();

  return {
    show: (options: SwalOptions) => swalAlert.show({ ...options, theme }),
    success: (title: string, text?: string, options?: SwalOptions) =>
      swalAlert.success(title, text, { ...options, theme }),
    error: (title: string, text?: string, options?: SwalOptions) =>
      swalAlert.error(title, text, { ...options, theme }),
    warning: (title: string, text?: string, options?: SwalOptions) =>
      swalAlert.warning(title, text, { ...options, theme }),
    info: (title: string, text?: string, options?: SwalOptions) =>
      swalAlert.info(title, text, { ...options, theme }),
    toast: (options: ToastOptions) => swalAlert.toast({ ...options, theme }),
    toastSuccess: (title: string, options?: ToastOptions) =>
      swalAlert.toastSuccess(title, { ...options, theme }),
    toastError: (title: string, options?: ToastOptions) =>
      swalAlert.toastError(title, { ...options, theme }),
    confirm: (options: ConfirmOptions) => swalAlert.confirm({ ...options, theme }),
  };

}