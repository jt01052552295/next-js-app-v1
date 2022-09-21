import { React, PropTypes, Fragment, useRouter } from '../../libraries';
import SiteFooter from '../organisms/SiteFooter';
import SiteHeader from '../organisms/SiteHeader';
import SiteLeftSidebar from '../organisms/SiteLeftSidebar';
import SiteRightSidebar from '../organisms/SiteRightSidebar';

export default function AppLayout({ ...props }) {
  const propTypes = {
    showSidebar: PropTypes.bool,
    children: PropTypes.any,
    url: PropTypes.string,
    images: PropTypes.array,
    title: PropTypes.any,
    description: PropTypes.string,
  };

  const defaultProps = {
    url: '',
    title: '',
    description: '',
    images: [],
    showSidebar: false,
  };

  // console.log(propTypes);

  const {
    children,
    mode,
    title,
    description,
    url,
    images,
    showLeftSidebar,
    showRightSidebar,
    showHeader,
    showFooter,
  } = props;
  // console.log(props.news);
  // console.log(props.users);
  return (
    <Fragment>
      {showHeader ? <SiteHeader /> : ''}
      {
        <main className="py-3">
          <div className="container">
            <div className="row">
              {showLeftSidebar && <SiteLeftSidebar />}
              <div className={'main-content col '}>{children}</div>
              {showRightSidebar && <SiteRightSidebar />}
            </div>
          </div>
        </main>
      }
      {showFooter ? <SiteFooter /> : ''}
    </Fragment>
  );
}
