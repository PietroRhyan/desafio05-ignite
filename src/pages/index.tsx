import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import { FiCalendar, FiUser } from 'react-icons/fi'

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

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

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Como utilizar Hooks</h1>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <small><i><FiCalendar/></i>15 Mar 2021</small>
        <small><i><FiUser/></i>Joseph Oliveira</small>
      </div>
      <div className={styles.content}>
        <h1>Como utilizar Hooks</h1>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <small><i><FiCalendar/></i>15 Mar 2021</small>
        <small><i><FiUser/></i>Joseph Oliveira</small>
      </div>
      <div className={styles.content}>
        <h1>Como utilizar Hooks</h1>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <small><i><FiCalendar/></i>15 Mar 2021</small>
        <small><i><FiUser/></i>Joseph Oliveira</small>
      </div>

      <div className={styles.content}>
        <h1>Como utilizar Hooks</h1>
        <p>Pensando em sincronização em vez de ciclos de vida.</p>

        <small><i><FiCalendar/></i>15 Mar 2021</small>
        <small><i><FiUser/></i>Joseph Oliveira</small>
      </div>


      <button>Carregar mais posts</button>
    </div>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const prismic = getPrismicClient({});
//   const postsResponse = await prismic.getByType('posts');

//   return {
//     props: {
//       postsResponse,
//     },
//     revalidate: 60 * 60 * 24 // 1 Day
    
//   }
// };
