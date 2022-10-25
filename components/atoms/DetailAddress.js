import Image from 'next/image';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

export default function DetailAddress({ data }) {
  const [loading, setLoading] = useState(true);

  const [list, setList] = useState([]);

  useEffect(() => {
    // if (data) {
    //   const newList = [];
    //   console.log('DetailAddress', data);
    // }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div className="">
          <div className="w-100 form-group mb-3">
            <h4 className="fw-bold">상세주소</h4>
          </div>
        </div>
      )}
    </>
  );
}
