"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { handelAsyc } from "@/helper/handleAsync";
import axios from "axios";
import { Group } from "@/interface";
import Loader from "@/app/frontendComponents/Loader/Loader";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/Logo.png";
import { Spinner } from "@/components/ui/spinner";
function InvitesPage() {
  const { groupId } = useParams();
  const navigate = useRouter();
  const { GroupInfo, isLoading } = useGroupInfo({ groupId: String(groupId) });

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const joinGroupMutation = useMutation({
    mutationFn: async () => {
      localStorage.setItem(
        "groupInfo",
        JSON.stringify({
          id: groupId,
          groupName: GroupInfo.groupName,
          adminId: GroupInfo.adminId,
          admin: { username: GroupInfo.admin.username },
        }),
      );
      navigate.push("/login");
    },
  });
  if (isLoading)
    return (
      <div className="max-w-2xl h-screen  mx-auto">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10 font-sans">
      <div className="max-w-2xl mx-auto bg-white shadow-sm">
        <div className="p-8">
          {/* <!-- Logo --> */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <Image
              src={Logo.src}
              alt="Just DM"
              height={36}
              width={36}
              className="object-contain"
            />

            <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Just DM
            </h2>
          </div>

          {/* <!-- Card --> */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* <!-- Top Bar --> */}
            <div className="h-1.5 bg-blue-500"></div>

            {Object.entries(GroupInfo).length === 0 ? (
              <div className="flex items-center justify-center py-12 px-4">
                <div className="flex flex-col items-center justify-center">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-50 text-red-500 text-2xl">
                    ⚠️
                  </div>

                  {/* Message */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Group not found
                  </h2>

                  <p className="text-gray-600 text-sm mb-6">
                    The group{" "}
                    <span className="font-medium text-gray-900">
                      {GroupInfo.groupName}
                    </span>{" "}
                    doesn’t exist or may have been deleted.
                  </p>

                  {/* Action Button */}
                  <Link
                    href="/"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition shadow-sm"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="p-6 text-center">
                  {/* <!-- Avatar --> */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-500 text-white text-3xl font-semibold flex items-center justify-center shadow">
                    {initials(GroupInfo.admin?.username)}
                  </div>

                  {/* <!-- Title --> */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {GroupInfo.admin?.username} invited you to join
                  </h2>

                  {/* <!-- Group Pill --> */}
                  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-5 py-2.5 rounded-full mb-5">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                    <span className="text-base">{GroupInfo.groupName}</span>
                  </div>

                  {/* <!-- Description --> */}
                  <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
                    You've been invited to join the{" "}
                    <span className="font-semibold">{GroupInfo.groupName}</span>{" "}
                    Group. Accept this invitation to start messaging and
                    collaborating with the team.
                  </p>

                  {/* <!-- Button --> */}
                  <button
                    onClick={() => joinGroupMutation.mutate()}
                    disabled={joinGroupMutation.isPending}
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-9 py-3 rounded-lg transition"
                  >
                    {joinGroupMutation.isPending ? (
                      <div className="flex flex-col gap-2 items-center justify-center">
                        <Spinner />
                        <h2>Joining...</h2>
                      </div>
                    ) : (
                      " Join Group"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* <!-- Security Notice --> */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-sm font-semibold text-yellow-800 mb-1">
              ⚠️ Security Notice
            </div>
            <p className="text-xs text-yellow-900 leading-relaxed">
              Only accept invitations from people you know and trust. If you
              don't recognize the sender, you can safely ignore this message.
            </p>
          </div>

          {/* <!-- Footer --> */}
          <div className="mt-6 border-t border-gray-200 pt-5 text-center text-xs text-gray-400">
            © 2026 Just DM
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitesPage;

function useGroupInfo({ groupId }: { groupId: string }) {
  const [GroupInfo, setGroupInfo] = useState<Group>({} as Group);
  const getGroupInfoQuery = useQuery({
    queryKey: [`groupInfo-${groupId}`],
    queryFn: async () => {
      const response = await handelAsyc(async () => {
        const groupResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/groups/${groupId}`,
        );
        return groupResponse.data;
      }, "Error in getting group Info");
      return response;
    },
    staleTime: 20_000,
  });

  useEffect(() => {
    if (
      !getGroupInfoQuery.data?.success ||
      !getGroupInfoQuery.data?.data?.success
    ) {
      return;
    }
    setGroupInfo(getGroupInfoQuery.data?.data?.data);
  }, [getGroupInfoQuery.data?.success]);
  return { GroupInfo, isLoading: getGroupInfoQuery.isLoading };
}
