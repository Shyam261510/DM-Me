import { useState } from "react";
import { Users } from "lucide-react";
import DialogCompo from "@/app/frontendComponents/Custom/Dialog/DialogCompo";
import DialogChildren from "@/app/frontendComponents/Custom/Dialog/DialogChildren";
import { useMember } from "@/hooks/useMember";
import { useInviteMember } from "@/hooks/useInviteMember";

interface Props {
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: string;
  groupName: string;
  userId: string;
  currentUserEmail: string;
}

export function InviteDialog({
  isOpen,
  setIsOpen,
  onOpenChange,
  groupId,
  groupName,
  userId,
  currentUserEmail,
}: Props) {
  const {
    memberEmail,
    setMemberEmail,
    memberEmails,
    setMemberEmails,
    removeEmail,
    memberHandler,
  } = useMember(currentUserEmail);

  const { mutate, isPending } = useInviteMember({
    onSuccess: () => {
      setMemberEmails([]);
      setMemberEmail("");
      onOpenChange(false);
    },
  });

  return (
    <DialogCompo
      isOpen={isOpen}
      onOpenChange={() => onOpenChange(!isOpen)}
      title="Invite New Member"
      className="bg-[#16161F] border border-[#23232E] w-[92vw] sm:w-[420px] max-w-md max-h-[85vh] overflow-y-auto"
      icon={<Users />}
    >
      <DialogChildren
        input={memberEmail}
        setInput={setMemberEmail}
        setIsOpen={setIsOpen}
        label="Invite member by email"
        placeholder="e.g one@gmail.com"
        buttonName="Invite"
        loader="Inviting..."
        mutation={() =>
          mutate({ groupId, emails: memberEmails, userId, groupName })
        }
        isPending={isPending}
        list={memberEmails}
        formHandler={memberHandler}
        removeItem={removeEmail}
      />
    </DialogCompo>
  );
}
