import { useEffect, useRecoilState, useRecoilValue } from '../libraries';
import { newsState, usersState } from '../atoms';

import Head from 'next/head';
import AppLayout from '../components/templates/AppLayout';

export default function Home({ newsResults, randomUsersResults }) {
  // 전역상태를 state로 만듦
  const [news, setNewsState] = useRecoilState(newsState);
  const [users, setUsersState] = useRecoilState(usersState);

  useEffect(() => {
    if (users.length === 0 && randomUsersResults.results?.length > 0) {
      setUsersState(randomUsersResults.results);
    }
    if (news.length === 0 && newsResults.articles?.length > 0) {
      setNewsState(newsResults.articles);
    }

    // console.log(newsResults.articles);
    // console.log(randomUsersResults.results);
  }, []);

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Next App v1</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout
        mode={'dev'}
        title="Homepage"
        description="Ini Description Homepage"
        showLeftSidebar={true}
        showRightSidebar={true}
        showHeader={true}
        showFooter={true}
      >
        {[...Array(100)].map((x, i) => (
          <p key={i}>test {i}</p>
        ))}
        <div>test11</div>
        <div>test22</div>
      </AppLayout>
    </div>
  );
}
// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json
export async function getStaticProps() {
  let newsResults = [];

  try {
    const res = await fetch('https://saurav.tech/NewsAPI/everything/cnn.json');

    newsResults = await res.json();
  } catch (e) {
    newsResults = [];
  }

  let randomUsersResults = [];

  try {
    const res = await fetch(
      'https://randomuser.me/api/?results=30&inc=name,login,picture,registered',
    );

    randomUsersResults = await res.json();
  } catch (e) {
    randomUsersResults = [];
  }

  return {
    props: {
      newsResults,
      randomUsersResults,
    },
  };
}
