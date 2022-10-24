import {
  React,
  useEffect,
  useState,
  PropTypes,
  Fragment,
  useRouter,
  Link,
  Image,
} from '../../libraries';
import SiteNavigation from '../molecules/SiteNavigation';

import { signInService, signUpService } from '../../services';

export default function SiteHeader({ ...props }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => {
      console.log(' hideContent', authorized);
      setAuthorized(false);
    };
    router.events.on('routeChangeStart', hideContent);
    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck);

    // console.log('header - authorized', authorized);
    if (signInService.userValue) {
      console.log('header - signInService.userValue', signInService.userValue);
    }
    if (signUpService.userValue) {
      console.log('header - signUpService.userValue', signUpService.userValue);
    }

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in

    const publicPaths = ['/member/sign-in', '/member/sign-up'];
    const path = url.split('?')[0];

    // console.log(JSON.parse(localStorage.getItem('user')));
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);

    if ((signInService.userValue || user) && !publicPaths.includes(path)) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      // router.push({
      //   pathname: '/member/sign-in',
      //   query: { returnUrl: router.asPath },
      // });
    }
  }

  function logout(e) {
    e.preventDefault();
    signInService.logout();
  }

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
          {authorized && (
            <Link href="#">
              <a onClick={logout}>
                <a className="btn btn-outline-primary me-2">Logout</a>
              </a>
            </Link>
          )}

          {!authorized && (
            <>
              <Link href="/member/sign-in">
                <a className="btn btn-outline-primary me-2">Login</a>
              </Link>
              <Link href="/member/sign-up">
                <a className="btn btn-primary">Sign-up</a>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
