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

export default function BoardBasicLists({ page, list, fallback }) {
  // console.log(list);
  const router = useRouter();
  const data = list;

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
        <div className="d-flex flex-column">
          {data.body?.map((article) => (
            <div className="card w-75 mb-3" key={article.id.toString()}>
              <div className="card-body">
                <h5 className="card-title">{article.id.toString() + '. ' + article.subject}</h5>
                <p className="card-text">{article.content.slice(0, 60) + '...'}</p>

                <Link href={`/board/basic/${article.id}`}>
                  <a className="btn btn-primary">More</a>
                </Link>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{article.created_at.slice(0, 10)}</li>
              </ul>
            </div>
          ))}
        </div>

        <div className="d-flex">
          <nav aria-label="Page navigation example">
            {data.body && (
              <Pagination
                innerClass={`pagination justify-content-center`}
                activeClass={`active`}
                activeLinkClass={``}
                itemClass={`page-item`}
                disabledClass={`disabled`}
                linkClass={`page-link`}
                activePage={data?.current_page}
                itemsCountPerPage={data.per_page}
                totalItemsCount={data?.itemCount}
                pageRangeDisplayed={data?.per_page}
                onChange={(page) => {
                  router.push(`/board/basic?page=${page}`);
                }}
              />
            )}
          </nav>{' '}
        </div>
      </AppLayout>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const url = `${process.env.PUBLIC_NEXT_API_URL}/posts/list/${page}`;
  const data = await fetchWrapper.get(url);
  //   const data = null;

  return {
    props: {
      page,
      list: data,
      fallback: {
        [url]: data,
      },
    },
  };
};
