import { React, PropTypes, Fragment, useRouter, Link, Image } from '../../libraries';
import SiteNavigation from '../molecules/SiteNavigation';

export default function SiteHeader({ ...props }) {
  // console.log(props);

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3 border-bottom fixed-top bg-light">
        <Link href="/">
          <a className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            <Image src="/vercel.svg" alt="Logo" width={60} height={30} />
          </a>
        </Link>

        <SiteNavigation />

        <div className="col-md-3 text-end">
          <Link href="/">
            <a className="btn btn-outline-primary me-2">Login</a>
          </Link>
          <Link href="/">
            <a className="btn btn-primary">Sign-up</a>
          </Link>
        </div>
      </header>
    </div>
  );
}
