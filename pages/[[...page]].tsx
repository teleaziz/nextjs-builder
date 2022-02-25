import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import builderConfig from '@config/builder'
import '@builder.io/widgets'
import 'vm2';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import { CodeBlock } from '../components/CodeBlock/CodeBlock'
import { Link } from '../components/Link/Link'


builder.init(builderConfig.apiKey)

export async function getStaticProps({
  params,
  locale
}: GetStaticPropsContext<{ page: string[] }>) {
  const page_params = params?.page
  const urlPath = '/' + (page_params?.join('/') || '');


  const page =
    (await builder
      .get('page', {
        userAttributes: {
          locale: locale,
          urlPath
        },
        includeUrl: true,
        includeRefs: true,
        cachebust: true,
        options: {
          data: {
            locale
          }
        }
      })
      .toPromise()) || null

  return {
    props: {
      page,
      locale
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    omit: 'data.blocks',
  })

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: true,
  }
}

export default function Page({
  page,
  locale
}: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  if (Builder.isBrowser) {
    console.log(' here page ', page, locale);
  }

  builder.setUserAttributes({ locale: locale })

  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!page && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>

        <Header />
          <DefaultErrorPage statusCode={404} />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />
        <CodeBlock  color="blue" title="Logo" />
        <BuilderComponent model="page" data={ {locale: locale} } content={page} renderLink={Link} />
      <Footer />
    </>
  )
}
