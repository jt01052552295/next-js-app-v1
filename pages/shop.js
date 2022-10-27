import AppLayout from '../components/templates/AppLayout';
import {
  useState,
  useEffect,
  useRouter,
  FontAwesomeIcon,
  Link,
  Image,
  axios,
  useRecoilState,
  useRecoilValue,
} from '../libraries';
import { faSearch, faEye, faEyeSlash, faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
import { category1State, category2State, productState } from '../atoms';
import { fetchWrapper } from '../helpers';

import Products from '../components/atoms/Products';
import ProductsEtc from '../components/atoms/ProductsEtc';

export default function Shop({ page, list, fallback }) {
  const [products, setProductsState] = useState([]);

  const category1 = useRecoilValue(category1State);
  const category2 = useRecoilValue(category2State);

  const [activeTab, setActiveTab] = useState('0202');

  const tabClickHandler = (index) => {
    //console.log(index);
    if (index !== '02') {
      setActiveTab(index);
    }
  };

  useEffect(() => {
    // if (products.length === 0 && list.body?.length > 0) {
    //   setProductsState(list.body);
    // }
    setProductsState(list.body);
    console.log(list.body);

    // Object.values(category2).map((row) => {
    //   let arr = Object.entries(row);
    //   console.log(arr[0][0], arr[0][1]);
    // });
  }, []);

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
        <div className="d-flex justify-content-center">
          <div className="w-100 text-center">
            <h1 className="h1">메뉴</h1>

            <ul className="nav nav-pills nav-fill mb-5">
              {Object.keys(category1).map((x) => {
                let arr = Object.entries(category1[x]);
                return (
                  <li
                    className={`nav-item ${arr[0][0] === '02' ? 'dropdown' : ''}`}
                    key={arr[0][0]}
                  >
                    <a
                      className={`nav-link ${arr[0][0] === '02' ? 'dropdown-toggle' : ''} ${
                        activeTab.substr(0, 2) === arr[0][0] ? 'active' : ''
                      }`}
                      href="#"
                      role={`${arr[0][0] === '02' ? 'button' : ''}`}
                      aria-expanded="false"
                      data-bs-toggle={`${arr[0][0] === '02' ? 'dropdown' : ''}`}
                      onClick={(e) => tabClickHandler(arr[0][0])}
                    >
                      {arr[0][1]}
                    </a>

                    {arr[0][0] === '02' && (
                      <ul className="dropdown-menu">
                        {Object.values(category2).map((row) => {
                          let arr = Object.entries(row);
                          return (
                            <li key={arr[0][0]}>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => tabClickHandler(arr[0][0])}
                              >
                                {arr[0][1]}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            {Object.values(category2).map((row) => {
              let arr = Object.entries(row);
              return (
                activeTab === arr[0][0] && (
                  <div className="w-100" key={arr[0][0]}>
                    Products
                    {/* <Products category={arr[0][0]} products={products} /> */}
                  </div>
                )
              );
            })}

            {Object.values(category1).map((row) => {
              let arr = Object.entries(row);
              return (
                activeTab === arr[0][0] && (
                  <div className="w-100" key={arr[0][0]}>
                    ProductsEtc
                    {/* <ProductsEtc category={arr[0][0]} products={products} /> */}
                  </div>
                )
              );
            })}
          </div>
        </div>
      </AppLayout>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/item/list`;
  const data = await fetchWrapper.get(url);
  //   const data = null;

  return {
    props: {
      page,
      list: data,
      fallback: {
        [url]: data,
      },
    },
  };
};
