import AppLayout from '../components/templates/AppLayout';
import { useState, useEffect, useRouter, FontAwesomeIcon, Link, Image, axios } from '../libraries';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
export default function About() {
  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="404"
        description=""
        showLeftSidebar={true}
        showRightSidebar={true}
        showHeader={true}
        showFooter={true}
      >
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold">About</h1>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
