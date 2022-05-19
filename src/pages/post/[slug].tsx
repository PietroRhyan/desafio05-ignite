import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../../services/prismic';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();
  const totalWords = post.data.content.reduce((total, contentItem) => {
    total += contentItem.heading.split(' ').length
    
    const words = contentItem.body.map(item => item.text.split(' ').length)

    words.map(word => (total += word))

    return total
  }, 0)

  const timeToRead = Math.ceil(totalWords / 200)

  const formattedDate = format(
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR,
    }
  )

  return (
    <>
      <Head>
        <title>Post | spacetraveling</title>
      </Head>

      {router.isFallback
        ?
        <>
          <div className={commonStyles.container}>
            <h2 className={styles.reload}>Carregando...</h2>
          </div>
        </>
        :
        <>
          <div className={styles.banner}>
            <img src={post.data.banner.url} alt="banner" />
          </div>

          <div className={commonStyles.container}>
            <div className={styles.content}>
              <h1>{post.data.title}</h1>

              <small><i><FiCalendar /></i>{formattedDate}</small>
              <small><i><FiUser /></i>{post.data.author}</small>
              <small><i><FiClock /></i>{`${timeToRead} min`}</small>

              <section>
                {post.data.content.map(content => {
                  return (
                    <div
                      className={styles.postContent}
                      key={content.heading}
                    >
                      <h2>{content.heading}</h2>
                      <div
                        className={styles.postSubContent}
                        dangerouslySetInnerHTML={{ __html: RichText.asHtml(content.body) }}
                      />
                    </div>
                  )
                })}
              </section>
            </div>
          </div>
        </>
      }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});

  const { slug } = params

  const response = await prismic.getByUID<any>('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        }
      })
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
