"use client";

import "../../styles/richText.css";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, Content, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import React, { useEffect, useMemo, useState } from "react";
import AutoAnimate from "../auto-animate";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import TextEditorMenu from "./text-editor-menu";
import InsertImageDialog from "./insert-image-modal";
import { useDisclosure } from "@/hooks/useDisclosure";

type RichTextEditorProps = {
  onChange: (...event: any[]) => void;
  onAddImage: (editor: Editor, file: File) => void;
  onBlur: () => void;
  placeholder: string;
  content: Content;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export const RichTextEditor = ({
  onChange,
  onAddImage,
  placeholder,
  content,
  error,
}: RichTextEditorProps) => {
  const editorStyle = useMemo(
    () =>
      `relative ${
        error ? "border-red-500" : "border-slate-300"
      } cursor-text max-h-32 scrollbar-thumb-neutral-300 scrollbar-track-slate-100 scrollbar-thin overflow-auto bg-white border-[1.5px] focus:outline outline-[1.5px] outline-primary rounded-sm px-2 py-1 focus:border-primary text-sm`,
    [error]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Underline,
      Image.configure({
        inline: true,
      }),
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: placeholder,
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange(editor);
    },
    editorProps: {
      attributes: {
        class: editorStyle,
      },
    },
    content: `${content}`,
  });
  const { onOpen, onClose, isOpen } = useDisclosure();

  const addImageToEditor = (imageFile: File) => {
    onAddImage(editor!, imageFile);
  };

  useEffect(() => {
    editor?.setOptions({
      editorProps: {
        attributes: {
          class: editorStyle,
        },
      },
    });
  }, [error, editor, editorStyle]);

  return (
    <>
      <InsertImageDialog
        onClose={onClose}
        isOpen={isOpen}
        addImageToEditor={addImageToEditor}
      />
      <div className={`cursor-text relative`}>
        <AutoAnimate duration={200}>
          {editor?.isFocused && (
            <TextEditorMenu
              openInsertImageDialog={() => onOpen()}
              editor={editor}
            />
          )}
        </AutoAnimate>

        <EditorContent className="relative" editor={editor} />
      </div>
    </>
  );
};
