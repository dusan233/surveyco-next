import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { uploadQuestionImageSchema } from "@/lib/validationSchemas";
import { ZodError, ZodIssue } from "zod";
import { Editor } from "@tiptap/react";

type InsertEditorImageProps = {
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  addImageToEditor: (file: File) => void;
};

const InsertEditorImage = ({
  onOpenChange,
  addImageToEditor,
}: InsertEditorImageProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<ZodIssue | null>(null);
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
          state={error ? "error" : "default"}
          onChange={(e) => {
            if (e.target.files) {
              const imageFile = e.target.files[0];

              try {
                const data = uploadQuestionImageSchema.parse(imageFile);

                setImageFile(data);
                setImagePreview(URL.createObjectURL(data));
              } catch (err) {
                if (err instanceof ZodError) {
                  const error = err.errors[0];
                  setError(error);
                }
              }
            }
          }}
        />
        {error && (
          <div className="text-xs font-medium text-destructive">
            {error.message}
          </div>
        )}
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
            if (imageFile) {
              addImageToEditor(imageFile);
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
