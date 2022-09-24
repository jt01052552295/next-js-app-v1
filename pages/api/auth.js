import axios from 'axios';

function showStatus(status) {
  switch (status) {
    case 200:
      return 'OK';
    case 404:
      return 'Not Found';
    case 500:
      return 'Internal Server Error';
  }
}

export default async function handler(req, res) {
  const { email, password } = req.body;

  //   const result = await axios.get('https://videoclass.cafe24.com/rest-api/employee/read');
  //   res.status(200).json({
  //     status: result.status,
  //     data: result.data,
  //   });

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    const send_data = JSON.stringify({ email: email, password: password });
    const result = await axios.post(
      'https://videoclass.cafe24.com/rest-api/employee/auth',
      send_data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    res.status(200).json({
      body: result.data,
    });
  } catch (e) {
    res.json({ success: false, message: 'Invalid credentials!' });
  }
}
