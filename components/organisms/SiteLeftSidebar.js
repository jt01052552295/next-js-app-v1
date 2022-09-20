import { React, PropTypes, Fragment, useRouter } from '../../libraries';

export default function SiteLeftSidebar({ ...props }) {
  // console.log(props);

  return (
    <Fragment>
      <aside className="sidebar-wrapper col-2 ">
        <div className="sidebar-inner ">LEFT_SIDEBAR</div>
      </aside>
    </Fragment>
  );
}
