import AppLayout from '../../../components/templates/AppLayout';
import {
  useState,
  useEffect,
  useRouter,
  FontAwesomeIcon,
  Link,
  Image,
  axios,
} from '../../../libraries';
import { fetchWrapper } from '../../../helpers';
import Head from 'next/head';

export default function ViewPage({ id, article, fallback }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>view - board</title>
      </Head>
      <AppLayout
        mode={'dev'}
        title="board-basic-list"
        description=""
        showLeftSidebar={true}
        showRightSidebar={true}
        showHeader={true}
        showFooter={true}
      >
        <div className="d-flex vh-100">
          <div class="card">
            <div class="card-header">created : {article?.created_at}</div>
            <div class="card-body">
              <h5 class="card-title">{article?.subject}</h5>
              <p class="card-text">{article?.content}</p>
            </div>
            <div class="card-footer text-end">
              <ul class="nav nav-pills card-header-pills">
                <li class="nav-item">
                  <Link href="/board/gallery">
                    <a class="nav-link active">List</a>
                  </Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#">
                    write
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const id = params.id;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/read/${id}`;
  const article = await fetchWrapper.get(url);

  return {
    props: {
      id: id,
      article: article,
      fallback: {
        [url]: article,
      },
    },
  };
};
