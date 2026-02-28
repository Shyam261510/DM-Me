import React from "react";
import { Spinner } from "@/components/ui/spinner";
interface DialogChildrenProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPending: boolean;
  label: string;
  placeholder: string;
  loader: string;
  buttonName: string;
  mutation: () => any;
  formHandler?: () => void;
  list?: string[];
  removeItem?: (index: number) => void;
}

function DialogChildren({
  input,
  setInput,
  setIsOpen,
  isPending,
  mutation,
  label,
  placeholder,
  loader,
  buttonName,
  formHandler,
  list,
  removeItem,
}: DialogChildrenProps) {
  function submitHandeler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formHandler) {
      formHandler();
      return;
    }
    mutation();
    setInput("");
    setIsOpen(false);
  }

  return (
    <div className="space-y-5 sm:space-y-6 px-1 sm:px-0">
      {/* Label */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-sm font-medium text-gray-300">{label}</label>

        <form onSubmit={submitHandeler} className="space-y-3">
          {/* Selected List as Tags */}
          {list && removeItem && list.length > 0 && (
            <div
              className="
            flex flex-wrap gap-2
            p-2 sm:p-3
            rounded-lg
            bg-[#0F0F14]
            border border-[#23232E]
            max-h-32 sm:max-h-40
            overflow-y-auto
          "
            >
              {list.map((item: string, index) => (
                <div
                  key={index}
                  className="
                flex items-center gap-1.5
                px-2.5 py-1
                text-[11px] sm:text-xs
                rounded-full
                bg-gradient-to-r from-purple-500/20 to-pink-500/20
                border border-purple-500/30
                text-purple-300
                max-w-full
              "
                >
                  <span className="truncate max-w-[120px] sm:max-w-[160px]">
                    {item}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="
                  text-purple-300/70
                  hover:text-red-400
                  transition
                  text-[10px] sm:text-xs
                  font-bold
                  flex-shrink-0
                "
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <input
            type="text"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
          h-10 sm:h-11 w-full
          rounded-lg
          border border-[#23232E]
          bg-[#0B0B0F]
          px-3 sm:px-4
          text-sm text-white
          placeholder:text-[#71717A]
          outline-none
          focus:border-purple-500
          focus:ring-2 focus:ring-purple-500/30
          transition
        "
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button
          onClick={() => setIsOpen(false)}
          className="
        w-full sm:w-auto
        px-4 sm:px-5
        py-2.5
        text-sm rounded-lg
        border border-[#23232E]
        text-gray-400
        hover:bg-[#1A1A22]
        hover:text-white
        transition
      "
        >
          Cancel
        </button>

        <button
          disabled={isPending}
          onClick={() => mutation()}
          className="
        w-full sm:w-auto
        px-4 sm:px-5
        py-2.5
        text-sm rounded-lg
        bg-gradient-to-r from-purple-500 to-pink-500
        font-medium text-white
        shadow-lg shadow-purple-500/10
        hover:opacity-90
        disabled:opacity-60
        disabled:cursor-not-allowed
        transition
      "
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner />
              {loader}
            </div>
          ) : (
            buttonName
          )}
        </button>
      </div>
    </div>
  );
}

export default DialogChildren;
