import { describe, it, expect } from "@jest/globals";
import { editorHasImage } from "../editorHasImage";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

describe("editorHasImage", () => {
  it("should return correct boolean value", () => {
    const extensions = [
      StarterKit,
      Image.configure({
        inline: true,
      }),
    ];

    const editor1 = new Editor({
      content:
        '<p>Checkbox q test1<img src="https://surveyco-survey-files.s3.eu-central-1.amazonaws.com/survey/ee27b8b3-f45d-4ef2-9f84-73780503b466/f9107f1f-e530-4db4-9e90-8e142422d5ee.png"></p>',
      extensions,
    });

    const editor2 = new Editor({
      content: `<p>Some example text content</p>`,
      extensions,
    });

    const result1 = editorHasImage(editor1);
    const result2 = editorHasImage(editor2);

    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });
});
