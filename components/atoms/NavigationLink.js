import { React, PropTypes, Link, useRouter } from '../../libraries';

export default function NavigationLink({ children, href, exact, ...props }) {
  NavigationLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool,
  };

  NavigationLink.defaultProps = {
    exact: false,
  };

  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += ' link-secondary';
  } else {
    props.className += ' link-dark';
  }

  //   console.log(children);
  //   console.log(href);
  //   console.log(exact);
  //   console.log(props);

  return (
    <Link href={href}>
      <a {...props}>{children}</a>
    </Link>
  );
}
