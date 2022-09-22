import {
  React,
  Link,
  useState,
  PropTypes,
  Fragment,
  useEffect,
  useRecoilState,
  useRecoilValue,
} from '../../libraries';
import { newsState } from '../../atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { DateTime } from 'luxon';
import News from '../atoms/news';

export default function SiteRightSidebar({ ...props }) {
  const news = useRecoilValue(newsState);
  const [articleNum, setArticleNum] = useState(3);

  return (
    <Fragment>
      <aside className="sidebar-wrapper  col-2">
        <div className="container-fluid">
          <h6>Whats happening</h6>
          <div className="list-group mb-3 ">
            {news.slice(articleNum - 3, articleNum).map((item) => (
              <News key={item.url} item={item} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setArticleNum(articleNum + 3)}
            className="btn btn-outline-primary btn-sm"
          >
            Next
          </button>
        </div>
      </aside>
    </Fragment>
  );
}
