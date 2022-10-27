import { DateTime } from 'luxon';
import {
  React,
  useState,
  useEffect,
  useRouter,
  FontAwesomeIcon,
  Link,
  Image,
  axios,
} from '../../libraries';

const formatter = Intl.NumberFormat('ko-kr');

export default function Products({ category, products }) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  useEffect(() => {
    if (category && products.length > 0) {
      setTimeout(() => {
        setLoading(false);
        let arr = products.filter((x) => x.category_code === category);
        setList(arr);
      }, 1000);
    }
  }, [category, products]);
  return (
    <>
      {loading ? (
        <div className="row">
          {[1, 2, 3, 4].map((x) => (
            <div className="col-sm-3 mb-3" key={x}>
              <div className="placeholder-glow" aria-hidden="true">
                <div className="d-flex w-100 justify-content-between ">
                  <span className="placeholder col-12"></span>
                </div>
                <span className="placeholder col-6"></span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          {list?.map((article) => (
            <div className="col-sm-3 mb-3" key={article.code}>
              <div className="card">
                <Link href={`#`}>
                  <a className="d-block">
                    <Image
                      src={`/product/${article.category_code}/${article.code}/list.png`}
                      width="200"
                      height="200"
                      className=" card-img-top  "
                      alt="card-image"
                    />
                  </a>
                </Link>
                <div className="card-body">
                  <Link href={`#`}>
                    <a className="d-block text-reset text-decoration-none">
                      <h6 className="h6 ">{article.name}</h6>
                    </a>
                  </Link>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">M {formatter.format(article.basic_price)}~</li>
                  {article.basic_price_m > 0 && (
                    <li className="list-group-item">
                      L {formatter.format(article.basic_price_m)}~
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
