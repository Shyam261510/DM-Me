import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, X } from "lucide-react";
import { file, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/Store";
import { ErrorToast } from "../Toasts/toast";

const emailValidationSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
});

function InviteMember() {
  const userInfo = useSelector((state: RootState) => state.dataSlice.user);

  const [emails, setEmails] = useState<string[]>([] as string[]);

  const form = useForm<z.infer<typeof emailValidationSchema>>({
    resolver: zodResolver(emailValidationSchema),
    defaultValues: {
      email: "",
    },
  });
  function removeEmailHandler(index: number) {
    setEmails((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(data: z.infer<typeof emailValidationSchema>) {
    if (data.email === userInfo.email) {
      ErrorToast("Opps! you add your own email address");
      return;
    }
    if (emails.includes(data.email)) {
      ErrorToast("Opps! I think you already added this email address");
      return;
    }
    setEmails((prev) => [...prev, data.email]);
    form.reset();
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Email chips */}
      <div className="flex gap-2 flex-wrap">
        {emails?.map((email, index) => (
          <div
            key={index}
            className="
          bg-indigo-50 
          border border-indigo-200 
          px-3 py-1 
          rounded-full 
          text-blue-700 
          flex items-center gap-2
          text-xs md:text-sm
        "
          >
            <span className="truncate max-w-[160px]">{email}</span>
            <span
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => removeEmailHandler(index)}
            >
              <X size={12} />
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <Mail
                  size={18}
                  className="text-zinc-400 absolute  top-5  -translate-y-1/2 left-3"
                />

                <Input
                  type="text"
                  placeholder="Invite by email address"
                  className="
                pl-10 
                text-sm 
                placeholder:text-zinc-400
                focus-visible:ring-blue-500
              "
                  {...field}
                />

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            className="
          w-full 
          bg-blue-600 
          hover:bg-blue-700 
          text-sm 
          font-medium
        "
          >
            Add Emails
          </Button>
        </form>
      </Form>
      <div className="flex justify-end">
        <Button className="w-25 border border-neutral-800 bg-neutral-50 text-neutral-800 transition duration-200 hover:bg-neutral-900 hover:text-white">
          Send Invite
        </Button>
      </div>
    </div>
  );
}

export default InviteMember;
