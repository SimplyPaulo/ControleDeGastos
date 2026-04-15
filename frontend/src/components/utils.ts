import { Modal, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

// Em mobile (< 576px) usa placement centralizado no topo; em desktop usa canto direito
const getPlacement = (): NotificationPlacement =>
  window.innerWidth < 576 ? 'top' : 'topRight';

// Em mobile as notificações ocupam a largura total da tela
const getStyle = () =>
  window.innerWidth < 576
    ? { width: '100vw', marginInlineEnd: 0, borderRadius: '0 0 12px 12px', top: 0 }
    : {};

export function notifySuccess(message: string, description?: string) {
  notification.success({
    message,
    description,
    placement: getPlacement(),
    duration: 3,
    style: getStyle(),
  });
}

export function notifyError(message: string, description?: string) {
  notification.error({
    message,
    description,
    placement: getPlacement(),
    duration: 4,
    style: getStyle(),
  });
}

export function confirmAction(title: string, content: string): Promise<boolean> {
  return new Promise((resolve) => {
    Modal.confirm({
      title,
      content,
      okText: 'Confirmar',
      okType: 'danger',
      cancelText: 'Cancelar',
      centered: true, // modal centralizado na tela — melhor em mobile
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
