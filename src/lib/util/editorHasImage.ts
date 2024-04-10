import { Editor } from "@tiptap/react";

export const editorHasImage = (editor: Editor) => {
  let imageExists = false;
  editor.state.doc.content.descendants((node) => {
    if (node.type.name === "image") {
      imageExists = true;
    }
  });

  return imageExists;
};
