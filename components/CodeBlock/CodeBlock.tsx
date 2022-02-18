import { Builder } from "@builder.io/react";

export const CodeBlock = (props: { color: any, title: any; }) => <h1 style={{ color: props.color }}>{props.title}</h1>;

Builder.registerComponent(CodeBlock, {
  name: "CodeBlock",
  inputs: [
    {
      name: "title",
      type: "text",
      defaultValue: 'I am a heading!'
    },
    {
      name: "color",
      type: "color",
      defaultValue: 'black'
    },
  ],
});