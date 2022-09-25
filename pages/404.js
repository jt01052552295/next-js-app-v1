import AppLayout from '../components/templates/AppLayout';
import { useState, useEffect, useRouter, FontAwesomeIcon, Link, Image, axios } from '../libraries';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
export default function PageNotFound() {
  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="404"
        description=""
        showLeftSidebar={false}
        showRightSidebar={false}
        showHeader={false}
        showFooter={true}
      >
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3">
              {' '}
              <span className="text-danger">Opps!</span> Page not found.
            </p>
            <p className="lead">The page you’re looking for doesn’t exist.</p>
            <Link href="/">
              <a className="btn btn-primary">Go Home</a>
            </Link>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
