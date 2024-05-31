"use client";

import React from "react";
import { editorHasImage } from "@/lib/util/editorHasImage";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Undo2,
  Redo2,
  ImageIcon,
} from "lucide-react";

type TextEditorMenuProps = {
  editor: Editor | null;
  openInsertImageDialog: () => void;
};

const TextEditorMenu = ({
  editor,
  openInsertImageDialog,
}: TextEditorMenuProps) => {
  const regularBtnClassNames =
    "bg-slate-500 text-white p-1 hover:bg-primary disabled:cursor-default hover:text-secondary disabled:pointer-events-none disabled:bg-slate-400";
  const highlightedBtnClassNames =
    "bg-primary text-secondary p-1 hover:bg-primary disabled:cursor-default hover:text-secondary disabled:pointer-events-none disabled:bg-slate-400";

  if (!editor) {
    return null;
  }
  const insertImageDisabled = editorHasImage(editor!);

  return (
    <div
      onMouseDown={(e) => {
        e.preventDefault();
        editor.chain().focus().run();
      }}
      className="absolute left-0 bottom-full flex text-sm mb-1"
    >
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? highlightedBtnClassNames
            : regularBtnClassNames
        }
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().run();
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={
          editor.isActive("underline")
            ? highlightedBtnClassNames
            : regularBtnClassNames
        }
      >
        <Underline className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? highlightedBtnClassNames
            : regularBtnClassNames
        }
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? highlightedBtnClassNames
            : regularBtnClassNames
        }
      >
        <Strikethrough className="h-4 w-4" />
      </button>
      <button
        type="button"
        disabled={insertImageDisabled}
        onClick={() => {
          openInsertImageDialog();
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().run();
        }}
        // disabled={!editor.can().chain().focus().redo().run()}
        className={regularBtnClassNames}
      >
        <ImageIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().run();
        }}
        disabled={!editor.can().chain().focus().undo().run()}
        className={regularBtnClassNames}
      >
        <Undo2 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        onMouseDown={(e) => {
          e.preventDefault();
          editor.chain().focus().run();
        }}
        disabled={!editor.can().chain().focus().redo().run()}
        className={regularBtnClassNames}
      >
        <Redo2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TextEditorMenu;
