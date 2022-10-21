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
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signInService } from '../../services';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkMeOut, setCheckMeOut] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordButtonIcon, setPasswordButtonIcon] = useState(faEyeSlash);
  const router = useRouter();

  const [buttons, setButtons] = useState([
    { label: 'password1', value: false, icon: faEyeSlash, field: 'password' },
    { label: 'password2', value: false, icon: faEyeSlash, field: 'password' },
  ]);

  useEffect(() => {
    console.log('signUp - signInService.userValue', signInService.userValue);
  }, []);

  const mainDivStyle = {
    padding: '1em',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '560px',
    margin: '0 auto',
  };

  const togglePassword = (param) => {
    const activeState = buttons.map((button) => {
      if (button.label === param) {
        button.value = !button.value;
        if (button.value) {
          button.icon = faEye;
          button.field = 'text';
        } else {
          button.icon = faEyeSlash;
          button.field = 'password';
        }
        return { label: button.label, value: button.value, icon: button.icon, field: button.field };
      } else {
        return { label: button.label, value: button.value, icon: button.icon, field: button.field };
      }
    });
    setButtons(activeState);
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

      // signInService
      //   .login(email, password)
      //   .then((res) => {
      //     console.log('res', res);
      //     if (res.success) {
      //       const returnUrl = router.query.returnUrl || '/';
      //       router.push(returnUrl);
      //     } else {
      //       throw res.message;
      //     }
      //   })
      //   .catch((error) => {
      //     // setError("apiError", { message: error });
      //     console.error('signInService - catch', error);
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="SignUp"
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
                  type={buttons[0].value ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={(e) => togglePassword('password1')}
                >
                  <FontAwesomeIcon icon={buttons[0].icon} />
                </button>
              </div>
              <div id="passwordHelp" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must
                not contain spaces, special characters, or emoji.
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputPassword2">Password</label>
              <div className="input-group ">
                <input
                  type={buttons[1].value ? 'text' : 'password'}
                  name="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={(e) => togglePassword('password2')}
                >
                  <FontAwesomeIcon icon={buttons[1].icon} />
                </button>
              </div>
              <div id="passwordHelp" className="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must
                not contain spaces, special characters, or emoji.
              </div>
            </div>
            {/* <div className="form-group form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={(e) => setCheckMeOut(!checkMeOut)}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div> */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </AppLayout>
    </div>
  );
}
