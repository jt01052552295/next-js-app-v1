import { React, PropTypes, Fragment, useEffect, useRecoilValue } from '../../libraries';
import { newsState, newsSelector } from '../../atoms';

export default function SiteRightSidebar({ ...props }) {
  // const news = useRecoilValue(newsState);

  useEffect(() => {
    // console.log(news);
  }, []);

  return (
    <Fragment>
      <aside className="sidebar-wrapper  col-2">
        <div className="container-fluid">RIGHT_SIDEBAR</div>
      </aside>
    </Fragment>
  );
}
