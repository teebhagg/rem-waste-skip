import type { StepItemProps } from "@/types/step-item-props"

function StepItem({ icon, label, completed, active }: StepItemProps) {
    return (
      <div className="flex flex-col items-center min-w-[80px]">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full mb-1
            ${completed ? "bg-blue-600 text-white" : ""}
            ${active ? "bg-blue-100 text-blue-600 border-2 border-blue-600 dark:bg-blue-950 dark:border-blue-500" : ""}
            ${!completed && !active ? "bg-slate-100 text-slate-400 dark:bg-slate-800" : ""}
          `}
        >
          {icon}
        </div>
        <span
          className={`text-xs sm:text-sm whitespace-nowrap ${active ? "font-medium text-blue-600 dark:text-blue-500" : ""}`}
        >
          {label}
        </span>
      </div>
    )
  }
export default StepItem