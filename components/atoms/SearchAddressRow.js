import Image from 'next/image';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

export default function SearchAddressRow({ item, setShowDetail }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('SearchAddressRow', item);
    if (item) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [item]);

  const setlocaladdr = (item) => {
    //console.log(item);

    let address_name = item.road_address?.address_name
      ? item.road_address?.address_name
      : item.address?.address_name;

    let road_name_temp = item.road_address?.road_name
      ? item.road_address?.road_name
      : item.address?.address_name;

    let region_1depth_name = item.road_address?.region_1depth_name
      ? item.road_address?.region_1depth_name
      : item.address?.region_1depth_name;
    let region_2depth_name = item.road_address?.region_2depth_name
      ? item.road_address?.region_2depth_name
      : item.address?.region_2depth_name;
    let region_3depth_name = item.road_address?.region_3depth_name
      ? item.road_address?.region_3depth_name
      : item.address?.region_3depth_h_name;

    localStorage.setItem('address', address_name);
    localStorage.setItem('road_name_temp', road_name_temp);
    localStorage.setItem('region_1depth_name', region_1depth_name);
    localStorage.setItem('region_2depth_name', region_2depth_name);
    localStorage.setItem('region_3depth_name', region_3depth_name);
    setShowDetail(true);
  };

  return (
    <>
      {loading ? (
        <div className="card mb-3" aria-hidden="true">
          <div className="row g-0">
            <div className="col-md-8 ">
              <div className="card-body p-1 placeholder-glow">
                <span className="placeholder col-10"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-9"></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="list-group-item list-group-item-action"
          onClick={(e) => setlocaladdr(item)}
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{item.address_name}</div>
          </div>
        </button>
      )}
    </>
  );
}
