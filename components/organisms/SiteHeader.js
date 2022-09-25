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

import { signInService } from '../../services';

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
    // if (signInService.userValue) {
    //   console.log('header - signInService.userValue', signInService.userValue);
    // }

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in

    const publicPaths = ['/member/sign-in'];
    const path = url.split('?')[0];
    if (!signInService.userValue && !publicPaths.includes(path)) {
      // console.log('1111');
      setAuthorized(false);
      // router.push({
      //   pathname: '/member/sign-in',
      //   query: { returnUrl: router.asPath },
      // });
    } else {
      // console.log('2222');
      setAuthorized(true);
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
            <a href="#" onClick={logout}>
              <a className="btn btn-outline-primary me-2">Logout</a>
            </a>
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
