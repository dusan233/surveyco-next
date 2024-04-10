import { uploadMedia } from "@/app/_actions/media-actions";
import AutoAnimate from "@/components/auto-animate";
import { RichTextEditor } from "@/components/text-editor/rich-text";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { editorHasImage } from "@/lib/util/editorHasImage";
import { Editor } from "@tiptap/react";
import React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";

type EditQuestionChoiceDescriptionProps = {
  surveyId: string;
  handleSaveQuestion: SubmitHandler<any>;
  index: number;
};

const EditQuestionChoiceDescription = ({
  surveyId,
  index,
  handleSaveQuestion,
}: EditQuestionChoiceDescriptionProps) => {
  const { toast } = useToast();
  const { control, setValue, getValues, handleSubmit } = useFormContext();

  return (
    <FormField
      control={control}
      name={`options.${index}.description`}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <RichTextEditor
              content={field.value}
              placeholder="Enter an answer choice"
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
                  setValue(
                    `options.${index}.descriptionImage`,
                    uploadedImageRes.fileUrl
                  );
                  editor!
                    .chain()
                    .focus()
                    .setImage({
                      src: uploadedImageRes.fileUrl,
                    })
                    .run();

                  await handleSubmit(handleSaveQuestion)();
                } catch (err) {
                  toast({
                    variant: "destructive",
                    title: "Something went wrong!",
                  });
                }
              }}
              onChange={(editor: Editor) => {
                const htmlContent = editor.getHTML();

                let imageExists = editorHasImage(editor);

                if (!imageExists && getValues().descriptionImage) {
                  setValue(`options.${index}.descriptionImage`, null);
                }

                field.onChange(editor.isEmpty ? "" : htmlContent);
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

export default EditQuestionChoiceDescription;
