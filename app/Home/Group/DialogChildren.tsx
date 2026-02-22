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
  list?: string[];
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
  list,
}: DialogChildrenProps) {
  function submitHandeler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation();
    setInput("");
    setIsOpen(false);
  }
  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">{label}</label>
        <form onSubmit={submitHandeler}>
          <input
            type="text"
            placeholder={placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="
                h-10 w-full
                rounded-lg
                border border-[#23232E]
                bg-[#0B0B0F]
                px-4 text-sm text-white
                placeholder:text-[#71717A]
                outline-none
                focus:border-[#6C5CE7]
                focus:ring-2 focus:ring-[#6C5CE7]/30
                transition
              "
          />
          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="
                w-full sm:w-auto
                px-4 py-2 text-sm rounded-lg
                border border-[#23232E]
                text-gray-400
                hover:bg-[#23232E] transition
              "
            >
              Cancel
            </button>

            <button
              disabled={isPending}
              className="
                w-full sm:w-auto
                px-4 py-2 text-sm rounded-lg
                bg-gradient-to-r from-purple-500 to-pink-500
                font-medium hover:opacity-90 transition
              "
            >
              {isPending ? (
                <h2 className="flex gap-2 items-center">
                  <Spinner />
                  {loader}
                </h2>
              ) : (
                buttonName
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DialogChildren;
