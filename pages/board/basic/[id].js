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

export default function ViewPage({ id, fallback }) {
  console.log(id);
  console.log(fallback);
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
        <div className="d-flex flex-column">asdf</div>
      </AppLayout>
    </div>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const id = params.id;
  const url = `${process.env.PUBLIC_NEXT_API_URL}/employee/read/${id}`;
  const article = await fetchWrapper.get(url);

  return {
    props: {
      id: id,
      fallback: {
        [url]: article,
      },
    },
  };
};
