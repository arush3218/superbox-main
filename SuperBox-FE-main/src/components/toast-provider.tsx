"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Toast = {
  id: number;
  title: string;
  description?: string;
  variant?: "info" | "success" | "error";
};

type ToastContextValue = {
  addToast: (args: {
    title: string;
    description?: string;
    variant?: Toast["variant"];
  }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    ({
      title,
      description,
      variant = "info",
    }: {
      title: string;
      description?: string;
      variant?: Toast["variant"];
    }) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    [],
  );

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[99999] space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[260px] max-w-[420px] px-5 py-3.5 rounded-2xl text-sm shadow-xl border ring-1 backdrop-blur-md bg-black/75 ${
              t.variant === "error"
                ? "border-red-500/40 ring-red-500/20"
                : t.variant === "success"
                  ? "border-green-500/40 ring-green-500/20"
                  : "border-white/15 ring-white/10"
            } text-white`}
          >
            <div className="font-semibold mb-0.5">{t.title}</div>
            {t.description ? (
              <div className="text-[13px] text-white/70">{t.description}</div>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
