import { useState } from "react";
import { ErrorToast } from "@/app/frontendComponents/Toasts/toast";
export function useMember(email: string) {
  const [memberEmail, setMemberEmail] = useState<string>("");
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  function removeEmail(index: number) {
    setMemberEmails((prev) => prev.filter((_, i) => i !== index));
  }

  function memberHandler() {
    // IF the user mistakenly add its own email then don't allow the user
    if (String(email).toLowerCase() === memberEmail.toLowerCase()) {
      ErrorToast("You cannot invite yourself");
      return;
    }
    setMemberEmails((prev) => [...prev, memberEmail]);
    setMemberEmail("");
  }

  return {
    memberEmail,
    setMemberEmail,
    memberEmails,
    setMemberEmails,
    removeEmail,
    memberHandler,
  };
}
