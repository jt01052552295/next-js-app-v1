// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case 'POST':
      const body = JSON.parse(req.body);
      res.status(200).json({ message: `You submitted the following data: ${body}` });

    // handle other HTTP methods
    default:
      res.status(200).json({ message: 'Welcome to API Routes!' });
  }
}
