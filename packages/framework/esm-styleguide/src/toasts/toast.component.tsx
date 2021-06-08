import React from "react";
import { ToastNotification } from "carbon-components-react/es/components/Notification";

const defaultOptions = {
  millis: 4000,
};

export interface ToastProps {
  toast: ToastNotificationMeta;
  closeToast(): void;
}

export interface ToastDescriptor {
  description: React.ReactNode;
  kind?: ToastType;
  title?: string;
  millis?: number;
}

export interface ToastNotificationMeta extends ToastDescriptor {
  id: number;
}

export type ToastType =
  | "error"
  | "info"
  | "info-square"
  | "success"
  | "warning"
  | "warning-alt";

export const Toast: React.FC<ToastProps> = ({ toast, closeToast }) => {
  const { description, kind, title, millis = defaultOptions.millis } = toast;
  const [waitingForTime, setWaitingForTime] = React.useState(true);

  React.useEffect(() => {
    if (waitingForTime) {
      const timeoutId = setTimeout(closeToast, millis);
      return () => clearTimeout(timeoutId);
    }
  }, [waitingForTime]);

  return (
    <div
      onMouseEnter={() => setWaitingForTime(false)}
      onMouseLeave={() => setWaitingForTime(true)}
    >
      <ToastNotification
        lowContrast
        kind={kind || "info"}
        subtitle={description}
        title={title || ""}
        timeout={millis}
      />
    </div>
  );
};