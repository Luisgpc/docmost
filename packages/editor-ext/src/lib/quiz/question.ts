import { Node, mergeAttributes } from "@tiptap/core";

export interface QuestionOptions {
  HTMLAttributes: Record<string, any>;
}

export interface QuestionAttributes {
  text: string;
  options: string[];
  answer: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    question: {
      setQuestion: (attributes: QuestionAttributes) => ReturnType;
    };
  }
}

export const Question = Node.create<QuestionOptions>({
  name: "question",
  group: "block",
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      text: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-question-text"),
        renderHTML: (attributes) => ({
          "data-question-text": attributes.text,
        }),
      },
      options: {
        default: [],
        parseHTML: (element) => {
          const data = element.getAttribute("data-question-options");
          try {
            return data ? JSON.parse(data) : [];
          } catch {
            return [];
          }
        },
        renderHTML: (attributes) => ({
          "data-question-options": JSON.stringify(attributes.options || []),
        }),
      },
      answer: {
        default: 0,
        parseHTML: (element) => {
          const val = element.getAttribute("data-question-answer");
          return val ? Number(val) : 0;
        },
        renderHTML: (attributes) => ({
          "data-question-answer": attributes.answer,
        }),
      },
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
      setQuestion:
        (attrs: QuestionAttributes) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },
});
