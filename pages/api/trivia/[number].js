import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import { axios } from '../../../libraries';
import { fetchWrapper } from '../../../helpers';

export default async function handler(req, res) {
  const number = Number(req.query.number);

  if (isNaN(number) || typeof number !== 'number') {
    res.status(400).send('Invalid request!!');
  }

  try {
    const result = await fetchWrapper.get(`http://numbersapi.com/${number}`);
    //console.log(result);

    res.json({
      success: true,
      result: result.text,
    });
  } catch (e) {
    //  e.message, e.response
    res.json({ success: false, message: e.message });
  }
}
