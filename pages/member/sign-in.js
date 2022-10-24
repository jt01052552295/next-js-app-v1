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
import { ErrorMessage, Field, Form, Formik } from 'formik';

export default function SignIn() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [checkMeOut, setCheckMeOut] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordButtonIcon, setPasswordButtonIcon] = useState(faEyeSlash);
  const router = useRouter();

  useEffect(() => {
    console.log('signIn - signInService.userValue', signInService.userValue);
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

  const togglePassword = () => {
    setPasswordShown(!passwordShown);

    if (passwordButtonIcon === faEye) {
      setPasswordButtonIcon(faEyeSlash);
    } else {
      setPasswordButtonIcon(faEye);
    }
  };

  const handleSubmit222 = async (e) => {
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
          if (res.success) {
            const returnUrl = router.query.returnUrl || '/';
            router.push(returnUrl);
          } else {
            throw res.message;
          }
        })
        .catch((error) => {
          // setError("apiError", { message: error });
          console.error('signInService - catch', error);
        });
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
          <Formik
            initialValues={{
              email: 'test@test.com',
              password: '1111',
              checkMeOut: false,
            }}
            validate={(values) => {
              const errors = {};
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = '이메일주소 형식에 맞게 입력해주세요.';
              } else if (!values.password) {
                errors.password = '비밀번호는 필수 입력항목입니다.';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              const { email, password, checkMeOut } = { ...values };

              try {
                signInService
                  .login(email, password)
                  .then((res) => {
                    // console.log('res', res);
                    if (res.success) {
                      const returnUrl = router.query.returnUrl || '/';
                      router.push(returnUrl);
                    } else {
                      throw res.message;
                    }
                  })
                  .catch((error) => {
                    // setError("apiError", { message: error });
                    console.error('signInService - catch', error);
                  });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
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
                    name="email"
                    id="inputEmail3"
                    aria-describedby="emailHelp"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div id="emailHelp" className="form-text">
                    <p className="text-danger mt-2">
                      {errors.email && touched.email && errors.email}
                    </p>
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
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    <p className="text-danger mt-2">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                </div>
                <div className="form-group form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="checkMeOut"
                    id="exampleCheck1"
                    checked={values.checkMeOut}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <div className="form-text">
                  <p className="text-danger mt-2">
                    {errors.checkMeOut && touched.checkMeOut && errors.checkMeOut}
                  </p>
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </>
                  ) : (
                    <>Submit</>
                  )}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </AppLayout>
    </div>
  );
}
