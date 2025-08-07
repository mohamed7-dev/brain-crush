import React from "react";
import { UploadDropzone } from "@/lib/uploadthing-client";
import { ourFileRouter } from "@/lib/uploadthing-server";
import { ClientUploadedFileData } from "uploadthing/types";
import "@uploadthing/react/styles.css";

export type UploadedFile = ClientUploadedFileData<null>;

type FileUploaderProps = {
  endpoint: keyof typeof ourFileRouter;
  onChange: (file: ClientUploadedFileData<null>) => void;
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
      onClientUploadComplete={(res) => onChange(res?.[0])}
      onUploadError={(e) => onUploadError?.(e.message)}
    />
  );
}
