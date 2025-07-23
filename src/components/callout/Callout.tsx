import React from "react";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";

export type CalloutType = "info" | "warning" | "success";

interface CalloutProps {
  title?: string;
  type?: CalloutType;
  children: React.ReactNode;
}

export const Callout: React.FC<CalloutProps> = ({
  title = "Note",
  type = "info",
  children,
}) => {
  const typeClasses = {
    info: {
      icon: <Info className="w-5 h-5 text-blue-600" />,
      border: "border-blue-300 bg-blue-50",
    },
    warning: {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
      border: "border-yellow-300 bg-yellow-50",
    },
    success: {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      border: "border-green-300 bg-green-50",
    },
  };

  const styles = typeClasses[type] || typeClasses.info;

  return (
    <div
      className={`border-l-4 p-4 rounded-md shadow-sm ${styles.border} flex gap-3 items-start`}
    >
      <div className="mt-1">{styles.icon}</div>
      <div>
        <p className="font-semibold mb-1">{title}</p>
        <div className="text-sm text-gray-800">{children}</div>
      </div>
    </div>
  );
};
