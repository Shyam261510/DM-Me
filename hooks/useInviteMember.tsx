import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  ErrorToast,
  successToast,
} from "@/app/frontendComponents/Toasts/toast";

interface InvitePayload {
  groupId: string;
  emails: string[];
  userId: string;
  groupName: string;
}

interface Options {
  onSuccess?: () => void;
}

export function useInviteMember({ onSuccess }: Options = {}) {
  return useMutation({
    mutationFn: async (payload: InvitePayload) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/sendInvitation`,
        payload,
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (!data?.success) {
        ErrorToast(data?.message);
        return;
      }
      successToast("Member invited successfully");
      onSuccess?.();
    },
  });
}
