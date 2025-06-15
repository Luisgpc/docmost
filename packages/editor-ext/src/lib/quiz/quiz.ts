import { Node, mergeAttributes } from "@tiptap/core";

export interface QuizOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    quiz: {
      setQuiz: () => ReturnType;
    };
  }
}

export const Quiz = Node.create<QuizOptions>({
  name: "quiz",
  group: "block",
  content: "question+",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes({ "data-type": this.name }, this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setQuiz:
        () =>
        ({ commands }) =>
          commands.insertContent({ type: this.name }),
    };
  },
});
