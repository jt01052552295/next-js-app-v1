import {
  React,
  useState,
  PropTypes,
  Fragment,
  Image,
  useEffect,
  useRecoilState,
  useRecoilValue,
} from '../../libraries';
import { usersState } from '../../atoms';
import { AnimatePresence, motion } from 'framer-motion';
import User from '../atoms/User';

export default function SiteLeftSidebar({ ...props }) {
  const users = useRecoilValue(usersState);
  const [randomUserNum, setRandomUserNum] = useState(3);

  return (
    <Fragment>
      <aside className="sidebar-wrapper col-2 ">
        <div className="sidebar-inner ">
          <h6>Who to follow</h6>
          {users.slice(randomUserNum - 3, randomUserNum).map((user) => (
            <User key={user.login.uuid} user={user} />
          ))}
          <button
            type="button"
            onClick={() => {
              setRandomUserNum(randomUserNum + 3);
            }}
            className="btn btn-outline-primary btn-sm"
          >
            Next
          </button>
        </div>
      </aside>
    </Fragment>
  );
}
