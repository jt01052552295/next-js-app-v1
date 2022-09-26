import AppLayout from '../../../components/templates/AppLayout';
import {
  useState,
  useEffect,
  useRouter,
  FontAwesomeIcon,
  Link,
  Image,
  axios,
} from '../../../libraries';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
export default function Create() {
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
            <h1 className="display-1 fw-bold">Create2</h1>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
