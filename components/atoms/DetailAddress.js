import Image from 'next/image';
import { DateTime } from 'luxon';
import { React, useEffect, useState, useRecoilState, useRecoilValue } from '../../libraries';
import { addressState } from '../../atoms';
import { useFormikContext, ErrorMessage, Field, Form, Formik } from 'formik';

export default function DetailAddress({ data }) {
  const [loading, setLoading] = useState(true);

  const [address, setAddressState] = useRecoilState(addressState);

  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');

  useEffect(() => {
    setLoading(false);
    setAddr1(localStorage.getItem('address'));
  }, []);

  const detail_addr_btn = () => {
    let road_name_temp = localStorage.getItem('road_name_temp')
      ? localStorage.getItem('road_name_temp')
      : '';
    localStorage.setItem('road_name', road_name_temp + ' ' + addr2);
    setAddressState(localStorage.getItem('road_name'));
  };

  return (
    <>
      {loading ? (
        <div></div>
      ) : (
        <div className="">
          <div className="w-100 form-group mb-3">
            <h4 className="fw-bold">상세주소</h4>
          </div>
          <div className="mb-3 row">
            <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
              기본주소
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="staticEmail"
                value={addr1}
                onChange={(e) => setAddr1(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="inputPassword" className="col-sm-2 col-form-label">
              상세주소
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="addr2"
                id="inputPassword"
                value={addr2}
                onChange={(e) => setAddr2(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-primary" onClick={(e) => detail_addr_btn()}>
              주소적용
            </button>
          </div>
        </div>
      )}
    </>
  );
}
