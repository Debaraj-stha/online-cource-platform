interface StepIndicatorProps {
  steps: number;
  currentStep: number; 
  onClick?:(step:number)=>void
}

const StepIndicator = ({ steps, currentStep ,onClick}: StepIndicatorProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: steps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
     
        return (
          <div key={index} className="relative flex-1">
            {/* Progress Bar */}
            <div
            // rounded at forst and list
              className={`h-3 ${index==0 ? "rounded-tl-lg rounded-bl-lg" :""} ${index==steps-1 ? "rounded-tr-lg rounded-br-lg" :""} transition-colors ${
                isCompleted ? "bg-blue-600" : "bg-gray-300"
              }`}
            />

            {/* Step Circle */}
            <div
            title={`Goto step ${index+1}`}
            onClick={()=>onClick?.(index+1)}
              className={`absolute top-1/2 -translate-y-1/2 left-1/2 cursor-pointer -translate-x-1/2 size-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
              ${isActive ? "bg-blue-600 text-white border-blue-600" : isCompleted ? "bg-blue-600 text-white border-blue-600" : "bg-gray-500  border-gray-400"}
              `}
            >
              {stepNumber}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
