import { React, PropTypes, Link } from '../../libraries';
import NavigationLink from '../atoms/NavigationLink';

export default function SiteNavigation({ ...props }) {
  //   console.log(Link);

  return (
    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li>
        <NavigationLink href="/" exact className="nav-link px-2 ">
          Home
        </NavigationLink>
      </li>

      <li>
        <NavigationLink href="/board/basic" exact className="nav-link px-2 ">
          Basic
        </NavigationLink>
      </li>
      <li>
        <NavigationLink href="/board/gallery" exact className="nav-link px-2 ">
          Gallery
        </NavigationLink>
      </li>
      <li>
        <NavigationLink href="/pricing" exact className="nav-link px-2 ">
          Shop
        </NavigationLink>
      </li>
      {/* <li>
        <NavigationLink href="/features" exact className="nav-link px-2 ">
          Features
        </NavigationLink>
      </li> */}
      <li>
        <NavigationLink href="/about" exact className="nav-link px-2 ">
          About
        </NavigationLink>
      </li>
    </ul>
  );
}
