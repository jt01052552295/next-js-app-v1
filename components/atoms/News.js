import Image from 'next/image';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

export default function News({ item }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (item) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [item]);
  return (
    <>
      {loading ? (
        <div className="placeholder-glow" aria-hidden="true">
          <div className="d-flex w-100 justify-content-between ">
            <span className="placeholder col-12"></span>
          </div>
          <span className="placeholder col-6"></span>
        </div>
      ) : (
        <a
          key={item.url}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="list-group-item list-group-item-action "
          aria-hidden="false"
        >
          <div className="d-flex w-100 justify-content-between ">
            <div className="text-truncate-container ">
              <p>{item.title}</p>
            </div>
          </div>
          <small className="">{DateTime.fromISO(item.publishedAt).toRelative()}</small>
        </a>
      )}
    </>
  );
}
