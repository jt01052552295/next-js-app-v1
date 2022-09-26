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
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { fetchWrapper } from '../../../helpers';
import Pagination from 'react-js-pagination';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function BoardBasicLists({ page, data, fallback }) {
  // console.log(list);

  const router = useRouter();
  const [list, setList] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [hasMore, setHashMore] = useState(true);

  const refresh = () => {
    setList([]);
    set_current_page(1);
    fetchMoreData();
  };

  const fetchMoreData = async () => {
    let list_url = `${process.env.NEXT_PUBLIC_API_URL}/posts/list/${current_page}`;
    axios.get(list_url).then((res) => {
      //   console.log(res);
      setList([...list, ...res.data.body]);
      set_current_page(current_page + 1);
      if (res.data.body.length == 0) {
        setHashMore(false);
        return;
      } else {
        setList([...list, ...res.data.body]);
        set_current_page(current_page + 1);
      }
    });
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  const loader = (
    <div className="placeholder-glow" aria-hidden="true">
      <div className="d-flex w-100 justify-content-between ">
        <span className="placeholder col-12"></span>
      </div>
      <span className="placeholder col-6"></span>
    </div>
  );

  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="board-basic-list"
        description=""
        showLeftSidebar={true}
        showRightSidebar={true}
        showHeader={true}
        showFooter={true}
      >
        <InfiniteScroll
          dataLength={list.length} //This is important field to render the next data
          next={fetchMoreData}
          hasMore={hasMore}
          loader={loader}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You have seen it all.</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={refresh}
          pullDownToRefresh={true}
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          <div className="row">
            {list?.map((article) => (
              <div className="col-sm-6 mb-3" key={article.id.toString()}>
                <div className="card">
                  <Image
                    src="/vercel.svg"
                    width="200"
                    height="200"
                    className=" card-img-top  "
                    alt="card-image"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{article.id.toString() + '. ' + article.subject}</h5>
                    <p className="card-text">{article.content.slice(0, 60) + '...'}</p>

                    <Link href={`/board/gallery/${article.id}`}>
                      <a className="btn btn-primary">More</a>
                    </Link>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">{article.created_at.slice(0, 10)}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </AppLayout>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/list/${page}`;
  const data = await fetchWrapper.get(url);
  //   const data = null;

  return {
    props: {
      page,
      data: data,
      fallback: {
        [url]: data,
      },
    },
  };
};
