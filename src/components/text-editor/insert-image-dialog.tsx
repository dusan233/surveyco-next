"use client";

import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

type CopyQuestionDialogProps = {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const InsertImageDialog = ({
  isOpen,
  onOpenChange,
}: CopyQuestionDialogProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files, "dsd");
    if (e.target.files) {
      console.log(e.target.files[0]);
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Dialog modal onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg">
        <DialogHeader hidden>
          <DialogTitle>Insert image</DialogTitle>
        </DialogHeader>
        <div className="gap-2  mt-5">
          {imagePreview && <img src={imagePreview} alt="dqwdwqkd1" />}
          <Input
            accept="image/*"
            type="file"
            onChange={handleImageFileChange}
          />
        </div>
        <DialogFooter className="mt-5">
          <Button onClick={() => onOpenChange(false)} size="sm">
            Cancel
          </Button>
          <Button size="sm">Ok</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsertImageDialog;
