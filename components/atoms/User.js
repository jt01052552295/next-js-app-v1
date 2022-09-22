import Image from 'next/image';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';

export default function User({ user }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [user]);
  return (
    <>
      {loading ? (
        <div className="card mb-3" aria-hidden="true">
          <div className="row g-0">
            <div className="col-md-4  ">
              <div className="text-center placeholder-glow">
                <span className="placeholder col-12" style={{ height: '95px' }}></span>
              </div>
            </div>
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
        <div className="card mb-3" aria-hidden="false">
          <div className="row g-0 p-1 ">
            <div className="col-md-4  ">
              <div className="text-center ">
                <Image
                  src={user.picture.thumbnail}
                  width="95"
                  height="95"
                  className=" rounded-circle  "
                  alt="user-image"
                />
              </div>
            </div>
            <div className="col-md-8 ">
              <div className="card-body p-1 ">
                <p className="card-text   mb-1">@{user.name.first + '' + user.name.last}</p>
                <p className="card-text ">
                  <small className="text-muted ">
                    Registered : {DateTime.fromISO(user.registered.date).toRelative()}
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
