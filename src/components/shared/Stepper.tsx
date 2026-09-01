import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";

export interface StepItem {
  id: string | number;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  className,
  orientation = "horizontal",
}) => {
  if (orientation === "vertical") {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isUpcoming = idx > currentStepIndex;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick && idx <= currentStepIndex && onStepClick(idx)}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border transition-all text-left",
                onStepClick && idx <= currentStepIndex ? "cursor-pointer" : "cursor-default",
                isCurrent
                  ? "bg-blue-50 border-blue-200 text-blue-900"
                  : isCompleted
                  ? "bg-white border-slate-200 hover:border-slate-300"
                  : "bg-slate-50 border-slate-200 opacity-60"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors",
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : isCurrent
                    ? "bg-blue-600 text-white ring-4 ring-blue-100"
                    : "bg-slate-200 text-slate-600"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <div>
                <p className={cn("text-sm font-semibold", isCurrent ? "text-blue-950" : "text-slate-800")}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal Stepper
  return (
    <div className={cn("w-full py-2 overflow-x-auto no-scrollbar", className)}>
      <div className="flex items-center justify-between relative min-w-[320px] sm:min-w-0 px-2">
        {/* Background track line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
        
        {/* Filled active track line */}
        <div
          className="absolute top-4 left-6 h-0.5 bg-blue-600 transition-all duration-300 -z-0"
          style={{
            width: steps.length > 1 ? `${(currentStepIndex / (steps.length - 1)) * 100}%` : "0%",
          }}
        />

        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick && idx <= currentStepIndex && onStepClick(idx)}
              className={cn(
                "flex flex-col items-center relative z-10 group text-center px-1 max-w-[80px] sm:max-w-[120px]",
                onStepClick && idx <= currentStepIndex ? "cursor-pointer" : "cursor-default"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200 bg-white shrink-0",
                  isCompleted
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : isCurrent
                    ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100 shadow-sm"
                    : "border-slate-300 text-slate-400"
                )}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" /> : idx + 1}
              </div>

              <span
                className={cn(
                  "mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium px-0.5 line-clamp-2 leading-tight",
                  isCurrent
                    ? "text-blue-900 font-bold"
                    : isCompleted
                    ? "text-slate-800 font-semibold"
                    : "text-slate-400"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
