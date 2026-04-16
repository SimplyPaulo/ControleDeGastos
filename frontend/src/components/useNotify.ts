import { App } from 'antd';


const durationInSeconds = 3;


export const useNotify = () => {
  const { notification, modal } = App.useApp();

  const notifySuccess = (message: string, description?: string) => {
    notification.success({
      message,
      description,
      placement: window.innerWidth < 576 ? 'top' : 'topRight',
      duration: durationInSeconds,
    });
  };

  const notifyError = (message: string, description?: string) => {
    notification.error({
      message,
      description,
      placement: window.innerWidth < 576 ? 'top' : 'topRight',
      duration: durationInSeconds,
    });
  };

  const confirmAction = (title: string, content: string): Promise<boolean> => {
    return new Promise((resolve) => {
      modal.confirm({
        title,
        content,
        okText: 'Confirmar',
        okType: 'danger',
        cancelText: 'Cancelar',
        centered: true,
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  };

  return { notifySuccess, notifyError, confirmAction };
};

export { durationInSeconds }