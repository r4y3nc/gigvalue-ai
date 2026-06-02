const ProgressBar = ({ currentStep, totalSteps = 6 }) => (
  <div className="flex gap-4 w-full max-w-4xl mb-12">
    {Array.from({ length: totalSteps }, (_, index) => {
      const step = index + 1;
      return (
        <div
          key={step}
          className="h-2.5 rounded-full flex-1 transition-all duration-500"
          style={{ backgroundColor: currentStep >= step ? "#83AA3E" : "#e2e8f0" }}
        />
      );
    })}
  </div>
);

export default ProgressBar;
