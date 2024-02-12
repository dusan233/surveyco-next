"use client";

import {
  MultiChoiceQuestionData,
  MultipleChoiceQuestion,
  UnsavedMultiChoiceQuestion,
} from "@/lib/types";
import React, { useContext } from "react";
import { RichTextEditor } from "@/components/text-editor/rich-text";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import QuestionOptionList from "./question-option-list";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionFooter from "./question-footer";
import useSaveQuestion from "@/lib/hooks/useSaveQuestion";
import { multiChoiceQuestionSchema } from "@/lib/validationSchemas";
import { useClickAwayQuestionEdit } from "@/lib/hooks/useClickAwayQuestionEdit";
import { useToast } from "@/components/ui/use-toast";
import AutoAnimate from "@/components/auto-animate";
import { Editor, JSONContent } from "@tiptap/react";
import { uploadMedia } from "@/app/actions";
import { Button } from "@/components/ui/button";
import QuestionSettings from "./question-settings";
import useBuildQuestionsContext from "../useBuildQuestionsContext";

export type MultiChoiceData = z.infer<typeof multiChoiceQuestionSchema>;
type MultiChoiceQuestionProps = {
  question: MultipleChoiceQuestion | UnsavedMultiChoiceQuestion;
  surveyId: string;
  index: number;
};

const BuildMultiChoiceQuestion = ({
  question,
  index,
  surveyId,
}: MultiChoiceQuestionProps) => {
  const { toast } = useToast();
  const form = useForm<MultiChoiceData>({
    resolver: zodResolver(multiChoiceQuestionSchema),
    defaultValues: {
      description: question.description,
      options: question.options.map((qChoice) => ({
        description: qChoice.description,
        descriptionImage: qChoice.description_image,
        ...(qChoice.id && { id: qChoice.id }),
      })),
      required: question.required,
      randomize: question.randomize,
      descriptionImage: question.description_image,
    },
  });

  const currentPage = useBuildQuestionsContext((s) => s.currentPage);
  const setQueueQuestion = useBuildQuestionsContext((s) => s.setQueueQuestion);
  const setCanSelectQuestion = useBuildQuestionsContext(
    (s) => s.setCanSelectQuestion
  );
  const setAddingQuestion = useBuildQuestionsContext(
    (s) => s.setAddingQuestion
  );

  const { isPending, saveQuestionMutation } = useSaveQuestion();

  const onSubmit: SubmitHandler<MultiChoiceData> = (data) => {
    console.log(data);

    const questionData: MultiChoiceQuestionData = {
      description: data.description,
      type: question.type,
      options: data.options,
      required: data.required,
      randomize: data.randomize,
      descriptionImage: data.descriptionImage,
      ...(question.id && { id: question.id }),
    };

    setCanSelectQuestion(false);
    const addingQuestionToast = toast({
      variant: "default",
      title: "Saving question...",
    });
    saveQuestionMutation(
      { surveyId, currentPage: currentPage!, data: questionData },
      {
        onSuccess(data) {
          setCanSelectQuestion(true);
          setAddingQuestion(false);
          if (!questionData.id) {
            setQueueQuestion(data.id);
          }
          addingQuestionToast.dismiss();
        },
      }
    );
  };
  const handleSubmit = async () => {
    await form.handleSubmit(onSubmit)();
  };

  const ref = useClickAwayQuestionEdit<HTMLDivElement>(async (e) => {
    const fn = form.handleSubmit(onSubmit);
    await fn();
    if (form.formState.errors.description || form.formState.errors.options) {
      console.log("before prop stop");
      e.stopPropagation();
    }
  });

  return (
    <div ref={ref}>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

                        let imageExists = false;
                        editor.state.doc.content.descendants((node) => {
                          if (node.type.name === "image") {
                            imageExists = true;
                          }
                        });

                        if (!imageExists && form.getValues().descriptionImage) {
                          console.log("unregistrujem");
                          form.setValue("descriptionImage", null);
                        }

                        field.onChange(editor.isEmpty ? "" : htmlContent);
                      }}
                      onAddImage={async (editor: Editor, file: File) => {
                        console.log(editor, file);
                        try {
                          const formData = new FormData();

                          formData.append("file", file);
                          const uploadedImageRes = await uploadMedia(
                            surveyId,
                            formData
                          );
                          form.setValue(
                            "descriptionImage",
                            uploadedImageRes.fileUrl
                          );
                          editor!
                            .chain()
                            .focus()
                            .setImage({
                              src: uploadedImageRes.fileUrl,
                            })
                            .run();

                          await form.handleSubmit(onSubmit)();
                        } catch (err) {
                          console.log(err);
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
            <Separator className="my-5" />
            <QuestionOptionList
              onQuestionSubmit={handleSubmit}
              surveyId={surveyId}
              control={form.control}
            />
            <QuestionSettings question={question} />
            <QuestionFooter questionIndex={index} isDisabled={isPending} />
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

export default BuildMultiChoiceQuestion;
