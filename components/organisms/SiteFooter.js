import { React, Link, PropTypes, Fragment, useRouter, FontAwesomeIcon } from '/libraries';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function SiteFooter({ ...props }) {
  // console.log(props);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container">
      <footer className="justify-content-center py-3 my-4 border-top">
        <p className="text-center text-muted">&copy; 2022 Company, Inc</p>
      </footer>
      <div className="top-to-btm">
        <button type="button" className="btn btn-dark" onClick={goToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </div>
    </div>
  );
}
