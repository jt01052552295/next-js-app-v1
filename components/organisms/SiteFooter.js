import { React, Link, PropTypes, Fragment, useRouter } from '/libraries';

export default function SiteFooter({ ...props }) {
  // console.log(props);

  return (
    <div className="container">
      <footer className="justify-content-center py-3 my-4 border-top">
        <p className="text-center text-muted">&copy; 2022 Company, Inc</p>
      </footer>
    </div>
  );
}
