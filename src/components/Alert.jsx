import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function Alert({ type, message }) {

  const alertStyles = {
    success: {
      icon: <CheckCircle className="text-green-400" size={22} />,
      border: "border-green-500/40",
      title: "Success",
      bg: "bg-green-500/20",
      color: "text-green-400",
    },

    error: {
      icon: <XCircle className="text-red-400" size={22} />,
      border: "border-red-500/40",
      title: "Error",
      bg: "bg-red-500/20",
      color: "text-red-400",
    },

    warning: {
      icon: <AlertTriangle className="text-yellow-400" size={22} />,
      border: "border-yellow-500/40",
      title: "Warning",
      bg: "bg-yellow-500/20",
      color: "text-yellow-400",
    },

    info: {
      icon: <Info className="text-blue-400" size={22} />,
      border: "border-blue-500/40",
      title: "Info",
      bg: "bg-blue-500/20",
      color: "text-blue-400",
    },
  };

  const style = alertStyles[type];

  return (
    <div
      className={`fixed top-5 right-4 left-4 sm:left-auto sm:right-5 flex items-center gap-4 bg-zinc-900 border ${style.border} text-white px-5 py-4 rounded-2xl shadow-2xl min-w-0 sm:min-w-[340px] z-50`}
    >
      
      <div className={`${style.bg} p-2 rounded-full`}>
        {style.icon}
      </div>

      <div className="flex-1">
        <h2 className={`font-semibold ${style.color}`}>
          {style.title}
        </h2>

        <p className="text-sm text-zinc-300">
          {message}
        </p>
      </div>
    </div>
  );
}