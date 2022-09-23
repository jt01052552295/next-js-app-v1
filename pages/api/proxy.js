import axios from 'axios';

function showStatus(status) {
  switch (status) {
    case 200:
      return 'OK';
    case 404:
      return 'Not Found';
  }
}

export default async function handler(req, res) {
  const google = await axios.get('https://google.com');
  const amazon = await axios.get('https://amazon.com');
  res.status(200).json({
    google: showStatus(google.status),
    amazon: showStatus(amazon.status),
  });
}
