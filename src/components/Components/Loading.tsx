const Loading = () => {
    return (
        <div>
    
    <div
      className="
        min-h-[60vh] flex flex-col items-center justify-center
        bg-[#F0FBFA] dark:bg-[#0B2423]
        text-[#018790] dark:text-[#00B7B5]
        transition-colors duration-300
      "
    >
      {/* Icon */}
      <div
        className="
          w-14 h-14 mb-4 flex items-center justify-center
          rounded-full
          bg-[#018790]/10 dark:bg-[#00B7B5]/15
          text-2xl font-bold
        "
      >
        💳
      </div>

      {/* Text */}
      <p className="text-lg font-semibold">
        No transactions found
      </p>

      <p className="text-sm mt-1 text-[#018790]/70 dark:text-[#00B7B5]/70">
        Your payment history will appear here
      </p>
    </div>
  

        </div>
    );
};

export default Loading;