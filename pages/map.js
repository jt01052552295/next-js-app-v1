import AppLayout from '../components/templates/AppLayout';
import {
  React,
  useState,
  useEffect,
  useRouter,
  FontAwesomeIcon,
  Link,
  Image,
  axios,
} from '../libraries';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useFormikContext, ErrorMessage, Field, Form, Formik } from 'formik';
import { mapService } from '../services';
import SearchAddress from '../components/atoms/SearchAddress';
import SearchAddressPage from '../components/atoms/SearchAddressPage';
import DetailAddress from '../components/atoms/DetailAddress';

export default function Map() {
  const [data, setData] = useState({});

  const [keyword, setKeyword] = useState('동래구 금강로');

  const [is_end, setIsEnd] = useState(false);
  const [pageable_count, setPageableCount] = useState(0);

  const [total_count, setTotalCount] = useState(0);
  const [per_page, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    if (page) {
      setTimeout(() => {
        searchAddr(keyword, page);
      }, 1000);
    }
  }, [keyword, page]);

  const searchAddr = (keyword, page) => {
    setShowDetail(false);
    setKeyword(keyword);
    const credentials = { keyword: keyword, page: page };
    try {
      mapService
        .search(credentials)
        .then((res) => {
          console.log(` ======================= `);
          console.log(res);
          console.log(` ======================= `);

          setData(res);
          setIsEnd(res.is_end);
          setPageableCount(res.pageable_count);
          setTotalCount(res.total_count);
        })
        .catch((error) => {
          // setError("apiError", { message: error });
          console.error('mapService - catch', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="404"
        description=""
        showLeftSidebar={true}
        showRightSidebar={true}
        showHeader={true}
        showFooter={true}
      >
        <Formik
          initialValues={{
            keyword: keyword,
            page: page,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.keyword) {
              errors.keyword = '필수 입력항목입니다.';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            //setSubmitting(true);
            const credentials = { ...values };
            console.log(credentials);

            searchAddr(credentials.keyword, credentials.page);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="w-100 form-group mb-3">
                  <h6 className="display-6 fw-bold">주소 설정</h6>
                </div>
                <div className="w-100 form-group mb-3">
                  <div className="input-group ">
                    <input
                      type="text"
                      name="keyword"
                      className="form-control"
                      placeholder="건물명,도로명 또는 지번으로 검색"
                      value={values.keyword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button className="btn btn-outline-secondary" type="submit">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </div>
              </div>
              {!showDetail && (
                <>
                  <SearchAddress data={data} setShowDetail={setShowDetail} />
                  <SearchAddressPage
                    is_end={is_end}
                    pageable_count={pageable_count}
                    total_count={total_count}
                    per_page={per_page}
                    page={page}
                    countPerPage={countPerPage}
                    keyword={values.keyword}
                    setPage={setPage}
                  />
                </>
              )}

              {showDetail && <DetailAddress />}
            </form>
          )}
        </Formik>
      </AppLayout>
    </div>
  );
}
