import React, { useEffect } from 'react';

interface ToastNotificationProps {
  message: string | null;
  onDismiss: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  onDismiss,
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-primary text-on-primary px-5 py-3.5 rounded-xl shadow-2xl border border-secondary/40 flex items-center gap-3">
        <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0">
          hotel_class
        </span>
        <span className="text-xs font-body font-medium leading-relaxed">
          {message}
        </span>
        <button
          onClick={onDismiss}
          className="ml-auto text-surface/60 hover:text-surface transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
