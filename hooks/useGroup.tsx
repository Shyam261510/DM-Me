import {
  ErrorToast,
  successToast,
} from "@/app/frontendComponents/Toasts/toast";
import { handelAsyc } from "@/helper/handleAsync";
import { Group, GroupMember, Role, User } from "@/interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setGroup, setGroups } from "@/libs/dataslice";
import { useSession } from "next-auth/react";

import { GroupInfo } from "@/interface";

function useGroup() {
  const dispatch = useDispatch();
  const [groupInfo, setGroupInfo] = useState<GroupInfo[]>([] as GroupInfo[]);

  const { status, data: session } = useSession();

  const createGroupMutation = useMutation({
    mutationFn: async ({
      user,
      groupName,
    }: {
      user: User;
      groupName: string;
    }) => {
      const res = await handelAsyc(async () => {
        console.log(user?.id);
        const createGroupResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!}/api/createGroup`,
          {
            userId: user?.id,
            groupName,
          },
        );
        return createGroupResponse.data;
      }, "Error in creating group");
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (!data?.success) {
        ErrorToast(data.message);
        return;
      }
      const newGroupInfo: GroupInfo = {
        id: data?.data,
        groupName: variables.groupName,
        adminId: variables.user?.id,
        reels: [] as string[],
        groupMembers: [
          {
            id: String(crypto.randomUUID()),
            userId: variables.user?.id,
            role: "ADMIN",
            username: variables.user.username,
          },
        ],
        createdAt: new Date(),
      };

      setGroupInfo([...groupInfo, newGroupInfo]);
      dispatch(setGroup(newGroupInfo));

      successToast(data?.message);
      return;
    },
    onError: (error) => {
      ErrorToast(error.message);
      return;
    },
  });

  const getGroupQuery = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT!}/api/getGroupInfo?userId=${session?.user?.id}`,
      );
      return res.data;
    },
    enabled: status === "authenticated",
    staleTime: 20_000,
  });

  useEffect(() => {
    if (getGroupQuery.data && !getGroupQuery.data.success) {
      ErrorToast(getGroupQuery.data.message);
      return;
    }
    setGroupInfo(getGroupQuery.data?.data as GroupInfo[]);
    dispatch(setGroups(getGroupQuery.data?.data as GroupInfo[]));
    return;
  }, [getGroupQuery.data?.success]);

  return {
    groups: groupInfo ?? ([] as GroupInfo[]),
    createGroupMutation,
    isLoading: getGroupQuery.isLoading,
  };
}

export default useGroup;
