import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import { FiCalendar, FiUser } from 'react-icons/fi'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import Head from 'next/head';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const formattedPost = postsPagination.results.map( post => {
    return {
      ...post,
      first_publication_date: format( 
        new Date(post.first_publication_date), 
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      )
    }
  })

  const [posts, setPosts] = useState<Post[]>(formattedPost)
  const [nextPage, setNextPage] = useState(postsPagination.next_page)
  const [currentPage, setCurrentPage] = useState(1)

  async function handleNewPosts() {
    if(currentPage !== 1 && nextPage === null) {
      return
    }

    const morePosts = await fetch(`${nextPage}`)
      .then( response => response.json())

    setNextPage(morePosts.next_page)
    setCurrentPage(morePosts.page)

    const newPosts = morePosts.results.map( post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date), 
          'dd MMM yyyy',
          {
            locale: ptBR,
          }
        ),
        data: {
          author: post.data.author,
          title: post.data.title,
          subtitle: post.data.subtitle
        } 
      }
    })

    setPosts([...posts, ...newPosts])
  }


  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <div className={commonStyles.container}>
        
        {posts.map( post => (
          <div className={styles.content} key={post.uid}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <h1>{post.data.title}</h1>
              </a>
            </Link>
            <p>{post.data.subtitle}</p>

            <small><i><FiCalendar/></i>{post.first_publication_date}</small>
            <small><i><FiUser/></i>{post.data.author}</small>
          </div>
        ))}

        { nextPage ? <button className={styles.loadPosts} onClick={handleNewPosts}>Carregar mais posts</button> : '' }
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', {
    pageSize: 2,
  });

  const posts = postsResponse.results.map( post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        author: post.data.author,
        title: post.data.title,
        subtitle: post.data.subtitle
      } 
    }
  })

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: posts,
  }
 
  return {
    props: {
      postsPagination,
    }
  }
};
