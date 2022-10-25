import Image from 'next/image';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import SearchAddressRow from './SearchAddressRow';

export default function SearchAddress({ data, setShowDetail }) {
  const [loading, setLoading] = useState(true);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (data) {
      const newList = [];
      console.log('searchaddress', data);
      if (data.body?.length > 0) {
        data.body.forEach((row) => {
          newList.push(row);
        });
        setList(newList);
        setLoading(false);
      }
    }
  }, [data]);

  return (
    <>
      {loading ? (
        <div>주소를 검색해보세요.</div>
      ) : (
        <div className="">
          <div className="w-100 form-group mb-3">
            <h4 className="fw-bold">검색결과</h4>
          </div>
          <div className="list-group">
            {list.map((item) => (
              <SearchAddressRow key={item.address_name} item={item} setShowDetail={setShowDetail} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
