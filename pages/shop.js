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
    if (products.length === 0 && list.body?.length > 0) {
      setProductsState(list.body);
    }
    // setProductsState(list.body);
    // console.log(list.body);

    // category1.map((row) => {
    //   let [code, name] = row;
    //   console.log(code, name);
    // });
    // category2.map((row) => {
    //   let [code, name] = row;
    //   console.log(code, name);
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
              {category1.map((row) => {
                let [code, name] = row;
                // console.log(arr);
                return (
                  <li className={`nav-item ${code === '02' ? 'dropdown' : ''}`} key={code}>
                    <a
                      className={`nav-link ${code === '02' ? 'dropdown-toggle' : ''} ${
                        activeTab.substr(0, 2) === code ? 'active' : ''
                      }`}
                      href="#"
                      role={`${code === '02' ? 'button' : ''}`}
                      aria-expanded="false"
                      data-bs-toggle={`${code === '02' ? 'dropdown' : ''}`}
                      onClick={(e) => tabClickHandler(code)}
                    >
                      {name}
                    </a>

                    {code === '02' && (
                      <ul className="dropdown-menu">
                        {category2.map((row) => {
                          let [code, name] = row;
                          //   console.log(arr);
                          return (
                            <li key={code}>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => tabClickHandler(code)}
                              >
                                {name}
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

            {category2.map((row) => {
              let [code, name] = row;
              return (
                activeTab === code && (
                  <div className="w-100" key={code}>
                    <Products category={code} products={products} />
                  </div>
                )
              );
            })}

            {category1.map((row) => {
              let [code, name] = row;
              return (
                activeTab === code && (
                  <div className="w-100" key={code}>
                    <ProductsEtc category={code} products={products} />
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
