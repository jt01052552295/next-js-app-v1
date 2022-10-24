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
import { signUpService } from '../../services';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export default function SignUp() {
  const router = useRouter();

  const [buttons, setButtons] = useState([
    { label: 'password1', value: false, icon: faEyeSlash, field: 'password' },
    { label: 'password2', value: false, icon: faEyeSlash, field: 'password' },
  ]);

  useEffect(() => {
    console.log('signUp - signUpService.userValue', signUpService.userValue);
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

  const handleSubmit222 = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password, password2 };
      console.log(credentials);

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
          <Formik
            initialValues={{
              email: 'test@test.com',
              password: '1111',
              password2: '1111',
            }}
            validate={(values) => {
              const errors = {};
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = '이메일주소 형식에 맞게 입력해주세요.';
              } else if (!values.password) {
                errors.password = '비밀번호는 필수 입력항목입니다.';
              } else if (!values.password2) {
                errors.password2 = '비밀번호확인은 필수 입력항목입니다.';
              } else if (values.password !== values.password2) {
                errors.password2 = '비밀번호가 같아야 합니다.';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              // console.log(values);
              const credentials = { ...values };
              console.log(credentials);

              try {
                signUpService
                  .signUp(credentials)
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
                    console.error('signUpService - catch', error);
                  });
              } catch (error) {
                console.log(error);
                // alert(error.response?.data?.message ?? error.message ?? '서버와 통신에 실패했습니다.');
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
              <form style={formStyle} onSubmit={handleSubmit}>
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
                      type={buttons[0].value ? 'text' : 'password'}
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
                      onClick={(e) => togglePassword('password1')}
                    >
                      <FontAwesomeIcon icon={buttons[0].icon} />
                    </button>
                  </div>
                  <div id="passwordHelp" className="form-text">
                    <p className="text-danger mt-2">
                      {errors.password && touched.password && errors.password}
                    </p>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="exampleInputPassword2">Password</label>
                  <div className="input-group ">
                    <input
                      type={buttons[1].value ? 'text' : 'password'}
                      name="password2"
                      className="form-control"
                      id="exampleInputPassword2"
                      value={values.password2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={(e) => togglePassword('password2')}
                    >
                      <FontAwesomeIcon icon={buttons[1].icon} />
                    </button>
                  </div>
                  <div id="passwordHelp2" className="form-text">
                    <p className="text-danger mt-2">
                      {errors.password2 && touched.password2 && errors.password2}
                    </p>
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
