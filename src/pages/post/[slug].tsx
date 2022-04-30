import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../../services/prismic';

import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useState } from 'react';
import { RichText } from 'prismic-dom';

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
  return (
    <>
      <Head>
        <title>Post | spacetraveling</title>
      </Head>

      <div className={styles.banner}>
        <img src="/images/space.jpg" alt="banner" />
      </div>
      <div className={commonStyles.container}>
        <div className={styles.content}>
          <h1>Título do post</h1>

          <small><i><FiCalendar/></i>15 Mar de 2021</small>
          <small><i><FiUser/></i>Joseph Oliveira</small>
          <small><i><FiClock/></i>4 min</small>

          <span>* editado no 19 Mar 2021, às 15:49</span>

          <section>
            <div 
              className={styles.postContent}
            >
              <h2>Título da sessão</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus optio at architecto nihil aspernatur 
                impedit nesciunt porro est fugiat, iusto officia ex officiis necessitatibus soluta. 
                Autem tempore doloremque consequatur eveniet.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus optio at architecto nihil aspernatur 
                impedit nesciunt porro est fugiat, iusto officia ex officiis necessitatibus soluta. 
                Autem tempore doloremque consequatur eveniet.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType('posts');

//   return {
//     paths: [],
//     fallback: true,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const prismic = getPrismicClient({});

//   const { slug } = params

//   const response = await prismic.getByUID<any>('posts', String(slug),{});

//   const post = {
//     first_publication_date: RichText.asText(response.first_publication.date),
//     data: {
//       title: RichText.asText(response.data.title),
//     }
//   }

//   return {
//     props: {
//       post,
//     }
//   }
// }
