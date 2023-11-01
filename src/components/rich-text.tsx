"use client";

import "../styles/richText.css";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, Editor, useEditor, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa6";
import { ImRedo2, ImUndo2 } from "react-icons/im";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const regularBtnClassNames =
    "bg-blue-400 text-white p-1 hover:bg-blue-300 hover:text-slate-700";
  const highlightedBtnClassNames =
    "bg-blue-600 text-white p-1 hover:bg-blue-300 hover:text-slate-700";

  if (!editor) {
    return null;
  }

  return (
    <div className="absolute left-0 bottom-full flex text-sm mb-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
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
        disabled={!editor.can().chain().focus().undo().run()}
        className={regularBtnClassNames}
      >
        <ImUndo2 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={regularBtnClassNames}
      >
        <ImRedo2 />
      </button>

      {/* <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button> */}
    </div>
  );
};

type RichTextEditorProps = {
  onChange: (...event: any[]) => void;
  onBlur: () => void;
  placeholder: string;
  content: Content;
};

export const RichTextEditor = ({
  onChange,
  placeholder,
  content,
}: RichTextEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const richEditorContainerRef = useRef<HTMLDivElement | null>(null);
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
        class: "focus:outline-none text-sm",
      },
    },
    content: content,
  });

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!richEditorContainerRef.current?.contains(target)) {
        setIsFocused(false);
      }
    });

    return window.removeEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (!richEditorContainerRef.current?.contains(target)) {
        setIsFocused(false);
      }
    });
  }, []);

  return (
    <>
      <div
        onMouseDown={() => {
          setIsFocused(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.target)) {
            setIsFocused(false);
          }
        }}
        ref={richEditorContainerRef}
        className={`relative bg-white border-2 rounded-sm p-2  ${
          isFocused ? "border-blue-500" : "border-slate-200"
        } focus:outline-none`}
      >
        {isFocused && <MenuBar editor={editor} />}

        <EditorContent editor={editor} />
      </div>
    </>
  );
};
