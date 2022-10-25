import Image from 'next/image';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

export default function SearchAddressPage({ ...param }) {
  const [loading, setLoading] = useState(true);

  const { countPerPage, is_end, keyword, page, pageable_count, per_page, total_count, setPage } =
    param;
  let mPageCount = Math.ceil(total_count / countPerPage);
  let mTotalBlock = Math.ceil(mPageCount / per_page);
  let mBlock = Math.ceil(page / per_page);
  let mFirstPerPage = (mBlock - 1) * per_page;
  let mLastPerPage = mTotalBlock <= mBlock ? mPageCount : mBlock * per_page;

  useEffect(() => {
    if (param) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [param]);

  const searchAddr = (query, pageNum) => {
    setPage(pageNum);
  };
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="d-flex justify-content-center m-4">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {/* {is_end}
          {pageable_count}
          {total_count}
          {per_page}
          {page}
          {keyword}
          <br />
          <br /> */}

              {total_count > 0 &&
                Array(mLastPerPage)
                  .fill()
                  .map((_, i) => (
                    <li className="page-item" key={i + 1}>
                      <button
                        type="button"
                        onClick={(e) => searchAddr(keyword, i + 1)}
                        aria-current={page === i + 1 ? 'active' : null}
                        className={page === i + 1 ? 'page-link active' : 'page-link'}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
