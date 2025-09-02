import { ENV } from '@/config/enviroments';
import { LANGUAGES } from '@/config/languages';
import { Metadata } from 'next';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';
import { META_INFO } from '@/shared/constants/meta/meta-info';

type OGImage = string | OGImageDescriptor | URL;
type OGImageDescriptor = {
  url: string | URL;
  secureUrl?: string | URL;
  alt?: string;
  type?: string;
  width?: string | number;
  height?: string | number;
};

type MetaTagsArgsType = {
  title?: string;
  description?: string;
  tags?: string | string[];
  pathname: string;
  images?: OGImage | Array<OGImage>;
  openGraph?: OpenGraph;
  twitter?: Twitter;
  locale: 'ru' | 'en' | 'kk';
};

export function getMetaTags({
  title,
  description,
  tags,
  pathname,
  images,
  openGraph,
  twitter,
  locale,
}: MetaTagsArgsType): Metadata {
  const defaultTitle = META_INFO.name[locale];
  const defaultDescription = META_INFO.home.description[locale];
  const defaultImage = `${ENV.BASE_ORIGIN}${META_INFO.cover[locale]}`;
  const defaultTags = META_INFO.home.keywords[locale];

  return {
    title: title,
    description: description || defaultDescription,
    keywords: tags || defaultTags,
    authors: [
      { name: 'Smart Aqmola', url: 'https://iaqmola.kz' },
      { name: 'Conference Organizer', url: ENV.BASE_ORIGIN },
    ],
    alternates: {
      canonical: `${ENV.BASE_ORIGIN}${pathname}`,
      languages: Object.fromEntries(
          LANGUAGES.map((lang) => [
            lang.code,
            `${ENV.BASE_ORIGIN}/${lang.code}${pathname}`,
          ])
      ),
    },
    generator: 'Next.js',
    creator: 'MIR code company',
    applicationName: defaultTitle,
    publisher: 'MIR code company',
    openGraph: {
      title: title || defaultTitle,
      description: description || defaultDescription,
      type: 'website',
      images: images || defaultImage,
      locale,
      ...openGraph,
    },
    twitter: {
      title: title || defaultTitle,
      description: description || defaultDescription,
      card: 'summary_large_image',
      images: images || defaultImage,
      ...twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
