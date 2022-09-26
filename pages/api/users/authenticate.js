const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import { axios } from '../../../libraries';

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return authenticate();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function authenticate() {
    const { email, password } = req.body;

    try {
      const send_data = JSON.stringify({ email: email, password: password });
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/employee/auth`,
        send_data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (result.data.email === email) {
        const token = jwt.sign({ sub: result.data.email }, serverRuntimeConfig.secret, {
          expiresIn: '7d',
        });
        return res.status(200).json({
          success: true,
          id: result.data.id,
          email: result.data.email,
          username: result.data.name,
          token,
        });
      } else {
        res.json({ success: false, message: 'Failed credentials!' });
      }
    } catch (e) {
      res.json({ success: false, message: 'Invalid credentials!' });
    }
  }
}
