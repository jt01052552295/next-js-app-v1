import {
  React,
  PropTypes,
  Link,
  FontAwesomeIcon,
  useState,
  useEffect,
  useRecoilState,
  useRecoilValue,
} from '../../libraries';
import { addressState } from '../../atoms';
import NavigationLink from '../atoms/NavigationLink';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function SiteNavigation({ ...props }) {
  //   console.log(Link);
  const [roadName, setRoadName] = useState('');

  const address = useRecoilValue(addressState);

  useEffect(() => {
    if (address || localStorage.getItem('road_name')) {
      setRoadName(localStorage.getItem('road_name'));
    }
  }, [address]);

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
        <NavigationLink href="/map" exact className="nav-link px-2 ">
          <FontAwesomeIcon icon={faLocationDot} /> {roadName ? roadName : '주소설정'}
        </NavigationLink>
      </li>
    </ul>
  );
}
