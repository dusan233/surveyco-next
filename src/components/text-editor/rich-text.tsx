"use client";

import "../../styles/richText.css";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import React, { useEffect, useMemo } from "react";
import AutoAnimate from "../auto-animate";
import { FieldError } from "react-hook-form";
import TextEditorMenu from "./text-editor-menu";

type RichTextEditorProps = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  placeholder: string;
  content: Content;
  error?: FieldError;
};

export const RichTextEditor = ({
  onChange,
  placeholder,
  content,
  error,
}: RichTextEditorProps) => {
  const editorStyle = useMemo(
    () =>
      `relative ${
        error ? "border-red-500" : "border-slate-300"
      } cursor-text bg-slate-50 border-[1.5px] focus:outline outline-[1.5px] outline-indigo-500 rounded-md px-2 py-1 focus:border-indigo-500 text-sm`,
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
      Placeholder.configure({
        emptyEditorClass: "is-editor-empty",
        placeholder: placeholder,
      }),
    ],
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();

      onChange(editor.isEmpty ? "" : htmlContent);
    },
    editorProps: {
      attributes: {
        class: editorStyle,
      },
    },
    content: `${content}`,
  });

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
    <div className={`cursor-text relative`}>
      <AutoAnimate duration={200}>
        {editor?.isFocused && <TextEditorMenu editor={editor} />}
      </AutoAnimate>

      <EditorContent className="relative" editor={editor} />
    </div>
  );
};
