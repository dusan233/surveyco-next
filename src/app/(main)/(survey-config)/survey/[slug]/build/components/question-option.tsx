import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RichTextEditor } from "@/components/text-editor/rich-text";
import { Option } from "@/lib/types";
import { Control, useFormContext } from "react-hook-form";

import { FaPlus, FaMinus } from "react-icons/fa6";
import AutoAnimate from "@/components/auto-animate";
import { Editor } from "@tiptap/react";
import { uploadMedia } from "@/app/actions";

type QuestionOptionProps = {
  option: Option;
  surveyId: string;
  control: Control<any, any>;
  index: number;
  removeOption: (optionIndex: number) => void;
  removeDisabled: boolean;
  addAnotherOption: (currentIndex: number) => void;
  onQuestionSubmit: () => Promise<void>;
};

const QuestionOption = ({
  control,
  index,
  addAnotherOption,
  removeOption,
  removeDisabled,
  surveyId,
  onQuestionSubmit,
}: QuestionOptionProps) => {
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex gap-2">
      <div className="flex-1">
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
                    console.log(editor, file);
                    try {
                      const formData = new FormData();

                      formData.append("file", file);
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

                      await onQuestionSubmit();
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  onChange={(editor: Editor) => {
                    const htmlContent = editor.getHTML();

                    let imageExists = false;
                    editor.state.doc.content.descendants((node) => {
                      if (node.type.name === "image") {
                        imageExists = true;
                      }
                    });

                    if (!imageExists && getValues().descriptionImage) {
                      setValue(`options.${index}.descriptionImage`, null);
                    }
                    console.log(htmlContent);
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
      </div>
      <div className="flex justify-start gap-2">
        <button
          type="button"
          onClick={() => addAnotherOption(index)}
          title="Add another option"
          className="rounded-full inline-flex justify-center hover:border-neutral-400 items-center w-8 h-8 border"
        >
          <FaPlus />
        </button>
        {!removeDisabled && (
          <button
            type="button"
            onClick={() => removeOption(index)}
            title="Delete this option"
            className="rounded-full inline-flex justify-center hover:border-neutral-400 items-center w-8 h-8 border"
          >
            <FaMinus />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionOption;
