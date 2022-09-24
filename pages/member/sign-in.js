import AppLayout from '../../components/templates/AppLayout';
import {
  useState,
  useEffect,
  useRouter,
  FontAwesomeIcon,
  Link,
  Image,
  axios,
} from '../../libraries';
import { faSearch, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signInService } from '../../services';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkMeOut, setCheckMeOut] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordButtonIcon, setPasswordButtonIcon] = useState(faEyeSlash);
  const router = useRouter();

  const mainDivStyle = {
    padding: '1em',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '560px',
    margin: '0 auto',
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);

    if (passwordButtonIcon === faEye) {
      setPasswordButtonIcon(faEyeSlash);
    } else {
      setPasswordButtonIcon(faEye);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };

      // axios
      //   .post('/api/auth', credentials)
      //   .then((res) => {
      //     console.log(res.data.body);
      //   })
      //   .catch((error) => console.error(error.message));

      signInService
        .login(email, password)
        .then((res) => {
          console.log('res', res);
        })
        .catch((error) => {
          // setError("apiError", { message: error });
          console.error('signInService', error);
        });

      // const user = await axios.post("/api/auth/login", credentials);

      // setAuth(true);

      // console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="SignIn"
        description=""
        showLeftSidebar={false}
        showRightSidebar={false}
        showHeader={false}
        showFooter={true}
      >
        <div style={mainDivStyle}>
          <form style={formStyle} onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group mb-3">
              <Link href="/">
                <a className="d-flex align-items-center justify-content-center ">
                  <Image src="/vercel.svg" alt="Logo" width={283} height={64} />
                </a>
              </Link>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="inputEmail3">Email</label>
              <input
                type="text"
                className="form-control"
                name="username"
                id="inputEmail3"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                We{`'`}ll never share your email with anyone else.
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <div className="input-group ">
                <input
                  type={passwordShown ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePassword}
                >
                  <FontAwesomeIcon icon={passwordButtonIcon} />
                </button>
              </div>
              <div id="passwordHelp" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must
                not contain spaces, special characters, or emoji.
              </div>
            </div>
            <div className="form-group form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={(e) => setCheckMeOut(!checkMeOut)}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </AppLayout>
    </div>
  );
}
