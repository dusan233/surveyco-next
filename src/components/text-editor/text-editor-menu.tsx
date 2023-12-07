import { Editor } from "@tiptap/react";
import React from "react";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa6";
import { ImRedo2, ImUndo2 } from "react-icons/im";

type TextEditorMenuProps = {
  editor: Editor | null;
};

const TextEditorMenu = ({ editor }: TextEditorMenuProps) => {
  const regularBtnClassNames =
    "bg-indigo-400 text-white p-1 hover:bg-indigo-300 hover:text-slate-700";
  const highlightedBtnClassNames =
    "bg-indigo-600 text-white p-1 hover:bg-indigo-300 hover:text-slate-700";

  if (!editor) {
    return null;
  }

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
        <FaBold />
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
        <FaUnderline />
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
        <FaItalic />
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
        <FaStrikethrough />
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
        <ImUndo2 />
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
        <ImRedo2 />
      </button>
    </div>
  );
};

export default TextEditorMenu;
