// utils/toast.ts
import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message, {
    style: {
      backgroundColor: "#e6ffed",
      border: "1px solid #28a745",
      color: "#155724",
      marginBottom: "50px",
    },
    icon: "✅",
    duration: 3000,
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    style: {
      backgroundColor: "#ffe6e6",
      border: "1px solid #dc3545",
      color: "#721c24",
      marginBottom: "50px",
    },
    icon: "❌",
    duration: 4000,
  });
};

export const showWarning = (message: string) => {
  toast(message, {
    style: {
      backgroundColor: "#fff3cd",
      border: "1px solid #ffc107",
      color: "#856404",
      marginBottom: "50px",
    },
    icon: "⚠️",
    duration: 3500,
  });
};
