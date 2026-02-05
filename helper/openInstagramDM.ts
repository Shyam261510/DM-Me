import { copyToClipboard } from "./copyToClipboard";

export const openInstagramDM = async (message: string) => {
  const username = "rohandeveloper6";

  copyToClipboard(message);
  window.open(`https://ig.me/m/${username}`, "_blank");
};
