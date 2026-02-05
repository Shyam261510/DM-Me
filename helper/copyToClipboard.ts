export const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text successfully copied to clipboard");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
};
