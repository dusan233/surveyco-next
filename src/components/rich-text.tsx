"use client";

import "../styles/richText.css";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, Editor, useEditor, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import React from "react";

import {
  FaBold,
  FaItalic,
  FaStrikethrough,
  FaUnderline,
} from "react-icons/fa6";
import { ImRedo2, ImUndo2 } from "react-icons/im";
import AutoAnimate from "./auto-animate";
import { FieldError } from "react-hook-form";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
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
  const editor = useEditor(
    {
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
          class: `relative ${
            error ? "border-red-500" : "border-slate-300"
          } cursor-text bg-slate-50 border-[1.5px] focus:outline outline-[1.5px] outline-indigo-500 rounded-md px-2 py-1 focus:border-indigo-500  border-slate-300  text-sm`,
        },
      },
      content: `${content}`,
    },
    [error]
  );

  return (
    <div className="cursor-text relative">
      <AutoAnimate duration={200}>
        {editor?.isFocused && <MenuBar editor={editor} />}
      </AutoAnimate>

      <EditorContent className="relative" editor={editor} />
    </div>
  );
};

// "use client";

// import "../styles/richText.css";

// import { mergeAttributes, Node } from "@tiptap/core";
// import Highlight from "@tiptap/extension-highlight";
// import TextAlign from "@tiptap/extension-text-align";
// import Placeholder from "@tiptap/extension-placeholder";
// import Underline from "@tiptap/extension-underline";
// import {
//   EditorContent,
//   Editor,
//   useEditor,
//   Content,
//   NodeViewWrapper,
//   ReactNodeViewRenderer,
// } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// import React, { useEffect, useRef, useState } from "react";

// import {
//   FaBold,
//   FaItalic,
//   FaStrikethrough,
//   FaUnderline,
// } from "react-icons/fa6";
// import { ImRedo2, ImUndo2 } from "react-icons/im";

// const MenuBar = ({ editor }: { editor: Editor | null }) => {
//   const regularBtnClassNames =
//     "bg-indigo-400 text-white p-1 hover:bg-indigo-300 hover:text-slate-700";
//   const highlightedBtnClassNames =
//     "bg-indigo-600 text-white p-1 hover:bg-indigo-300 hover:text-slate-700";

//   if (!editor) {
//     return null;
//   }

//   return (
//     <div className="absolute left-0 bottom-full flex text-sm mb-1">
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         onMouseDown={(e) => {
//           e.preventDefault();
//           editor.chain().focus().run();
//         }}
//         disabled={!editor.can().chain().focus().toggleBold().run()}
//         className={
//           editor.isActive("bold")
//             ? highlightedBtnClassNames
//             : regularBtnClassNames
//         }
//       >
//         <FaBold />
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//         onMouseDown={(e) => {
//           e.preventDefault();
//           editor.chain().focus().run();
//         }}
//         disabled={!editor.can().chain().focus().toggleUnderline().run()}
//         className={
//           editor.isActive("underline")
//             ? highlightedBtnClassNames
//             : regularBtnClassNames
//         }
//       >
//         <FaUnderline />
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         onMouseDown={(e) => {
//           e.preventDefault();
//           editor.chain().focus().run();
//         }}
//         disabled={!editor.can().chain().focus().toggleItalic().run()}
//         className={
//           editor.isActive("italic")
//             ? highlightedBtnClassNames
//             : regularBtnClassNames
//         }
//       >
//         <FaItalic />
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         onMouseDown={(e) => {
//           e.preventDefault();
//           editor.chain().focus().run();
//         }}
//         disabled={!editor.can().chain().focus().toggleStrike().run()}
//         className={
//           editor.isActive("strike")
//             ? highlightedBtnClassNames
//             : regularBtnClassNames
//         }
//       >
//         <FaStrikethrough />
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().undo().run()}
//         onMouseDown={(e) => {
//           e.preventDefault();
//           editor.chain().focus().run();
//         }}
//         disabled={!editor.can().chain().focus().undo().run()}
//         className={regularBtnClassNames}
//       >
//         <ImUndo2 />
//       </button>
//       <button
//         type="button"
//         onClick={() => editor.chain().focus().redo().run()}
//         onMouseDown={(e) => {
//           e.preventDefault();
//           editor.chain().focus().run();
//         }}
//         disabled={!editor.can().chain().focus().redo().run()}
//         className={regularBtnClassNames}
//       >
//         <ImRedo2 />
//       </button>
//     </div>
//   );
// };

// type RichTextEditorProps = {
//   onChange: (...event: any[]) => void;
//   onBlur: () => void;
//   placeholder: string;
//   content: Content;
// };

// export const RichTextEditor = ({
//   onChange,
//   placeholder,
//   content,
// }: RichTextEditorProps) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const richEditorContainerRef = useRef<HTMLDivElement | null>(null);
//   const richEditorRef = useRef<HTMLDivElement | null>(null);
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: {
//           keepMarks: true,
//           keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//         },
//         orderedList: {
//           keepMarks: true,
//           keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//         },
//       }),
//       TextAlign.configure({
//         types: ["heading", "paragraph"],
//       }),
//       Highlight,
//       Underline,
//       Placeholder.configure({
//         emptyEditorClass: "is-editor-empty",
//         placeholder: placeholder,
//       }),
//     ],
//     onUpdate: ({ editor }) => {
//       const htmlContent = editor.getHTML();

//       onChange(editor.isEmpty ? "" : htmlContent);
//     },

//     editorProps: {
//       attributes: {
//         class: `relative cursor-text bg-slate-50 border-[1.5px] focus:outline outline-[1.5px] outline-indigo-500 rounded-md p-2 focus:border-indigo-500  border-slate-300  text-sm`,
//       },
//     },
//     content: `${content}
//     <MenuBar editor={editor} />
//     `,
//   });

//   useEffect(() => {
//     if (isFocused) editor?.commands.focus();
//   }, [isFocused, editor]);

//   useEffect(() => {
//     window.addEventListener("mousedown", (e: any) => {
//       if (!richEditorContainerRef.current?.contains(e.target)) {
//         setIsFocused(false);
//       }
//     });
//   }, []);

//   return (
//     // <>
//     <div
//       // onMouseDown={() => {
//       //   setIsFocused(true);
//       //   editor?.commands.focus();
//       // }}
//       // onFocus={() => {
//       //   setIsFocused(true);
//       // }}
//       // onBlur={(e) => {
//       //   // console.log("ddwww", e.currentTarget, e.target);
//       //   if (!e.currentTarget.contains(e.target)) {
//       //     setIsFocused(false);
//       //     console.log("d212112");
//       //   }
//       // }}
//       // onKeyDown={(e) => {
//       //   if (e.key === "Tab") {
//       //     console.log("shitt");
//       //     setIsFocused(false);
//       //   }
//       // }}
//       ref={richEditorContainerRef}
//       className="cursor-text relative"
//       // className={`relative cursor-text bg-slate-50 border-[1.5px] rounded-md p-2  ${
//       //   isFocused ? "border-indigo-500" : "border-slate-300"
//       // } focus:outline-none`}
//     >
//       {editor?.isFocused && <MenuBar editor={editor} />}
//       <EditorContent
//         // onFocus={(e) => {
//         //   setIsFocused(true);
//         //   console.log("editor focus", e.target);
//         // }}
//         // onKeyDown={(e) => {
//         //   if (e.key === "Tab") {
//         //     setIsFocused(false);
//         //   }
//         // }}
//         // onBlur={(e) => {
//         //   setIsFocused(false);
//         //   console.log("editor blur", e.target);
//         // }}
//         className="relative"
//         editor={editor}
//       />
//     </div>
//     // {/* </> */}
//   );
// };
