import { RichTextEditor } from "@/components/text-editor/rich-text";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Editor } from "@tiptap/react";
import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

import AutoAnimate from "@/components/auto-animate";
import { useToast } from "@/components/ui/use-toast";
import { uploadMedia } from "@/actions/media-actions";
import { editorHasImage } from "@/lib/util/editorHasImage";

type EditQuestionDescriptionProps = {
  surveyId: string;
  handleSaveQuestion: SubmitHandler<any>;
};

const EditQuestionDescription = ({
  surveyId,
  handleSaveQuestion,
}: EditQuestionDescriptionProps) => {
  const { toast } = useToast();
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <RichTextEditor
              content={field.value}
              placeholder="Enter your question"
              onChange={(editor: Editor) => {
                const htmlContent = editor.getHTML();

                let imageExists = editorHasImage(editor);

                if (!imageExists && form.getValues().descriptionImage) {
                  form.setValue("descriptionImage", null);
                }

                field.onChange(editor.isEmpty ? "" : htmlContent);
              }}
              onAddImage={async (editor: Editor, file: File) => {
                try {
                  const formData = new FormData();

                  formData.append("file", file);
                  let imageExists = editorHasImage(editor);
                  if (imageExists) return;

                  const uploadedImageRes = await uploadMedia(
                    surveyId,
                    formData
                  );
                  form.setValue("descriptionImage", uploadedImageRes.fileUrl);
                  editor!
                    .chain()
                    .focus()
                    .setImage({
                      src: uploadedImageRes.fileUrl,
                    })
                    .run();

                  await form.handleSubmit(handleSaveQuestion)();
                } catch (err) {
                  toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                  });
                }
              }}
              onBlur={field.onBlur}
              error={fieldState.error}
            />
          </FormControl>
          <AutoAnimate>
            <FormMessage />
          </AutoAnimate>
        </FormItem>
      )}
    />
  );
};

export default EditQuestionDescription;
