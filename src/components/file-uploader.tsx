import React from "react";
import { UploadDropzone } from "@/lib/uploadthing-client";
import { ourFileRouter } from "@/lib/uploadthing-server";
import "@uploadthing/react/styles.css";

type FileUploaderProps = {
  endpoint: keyof typeof ourFileRouter;
  onChange: (url?: string) => void;
  onUploadError?: (message: string) => void;
};
export function FileUploader({
  endpoint,
  onChange,
  onUploadError,
}: FileUploaderProps) {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0]?.ufsUrl)}
      onUploadError={(e) => onUploadError?.(e.message)}
    />
  );
}
