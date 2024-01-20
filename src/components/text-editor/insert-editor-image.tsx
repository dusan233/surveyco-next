import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";

type InsertEditorImageProps = {
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  addImageToEditor: (src: string) => void;
};

const InsertEditorImage = ({
  onOpenChange,
  addImageToEditor,
}: InsertEditorImageProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { setValue } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <>
      <div className="space-y-2 mt-5">
        {imagePreview && (
          <img src={imagePreview} alt="question description picture" />
        )}

        <Input
          accept=".jpg, .jpeg, .png, .webp"
          type="file"
          onChange={(e) => {
            setValue("descriptionImage", e.target.files?.[0]);
            if (e.target.files) {
              const imageFile = e.target.files[0];
              setImageFile(imageFile);
              setImagePreview(URL.createObjectURL(imageFile));
            }
          }}
        />
      </div>
      <DialogFooter className="mt-5">
        <Button
          onClick={() => {
            onOpenChange(false);
          }}
          size="sm"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (imageFile && imagePreview) {
              setValue("descriptionImage", imageFile, {
                shouldValidate: true,
              });
              addImageToEditor(imagePreview);
            }

            onOpenChange(false);
          }}
          size="sm"
        >
          Ok
        </Button>
      </DialogFooter>
    </>
  );
};

export default InsertEditorImage;
