import { generateUploadButton } from "@uploadthing/react";

export const UploadButton = generateUploadButton({
  url: `${import.meta.env.VITE_API_URL}/api/uploadthing`,
});