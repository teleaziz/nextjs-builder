import type { AppProps } from 'next/app'

import { Builder, builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import { CodeBlock } from '../components/CodeBlock/CodeBlock'

builder.init(builderConfig.apiKey)


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


export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
