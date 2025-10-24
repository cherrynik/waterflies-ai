export interface NotificationProps {
  isVisible: boolean;
  title: string;
  message: string;
  type?: 'warning' | 'error' | 'info';
}
