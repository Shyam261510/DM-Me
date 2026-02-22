import React from "react";

interface DialogButtonProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  icon: React.ReactNode;
  title: string;
  className?: string;
}

function DialogButton({
  setIsOpen,
  icon,
  title,
  className = "",
}: DialogButtonProps) {
  return (
    <div className="w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(true)}
        className={`
          w-full sm:w-auto
          flex items-center justify-center gap-2
          
          min-h-[44px]   /* better mobile tap target */
          
          px-4 sm:px-5
          py-2.5
          
          text-sm sm:text-base
          font-semibold
          
          rounded-xl
          
          bg-gradient-to-r from-purple-500 to-pink-500
          
          hover:opacity-90
          active:scale-[0.98]
          transition-all duration-200
          
          shadow-md hover:shadow-lg
          
          ${className}
        `}
      >
        {icon}
        <span className="whitespace-nowrap">{title}</span>
      </button>
    </div>
  );
}

export default DialogButton;
