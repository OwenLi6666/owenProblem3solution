import express from 'express';
import puppeteer from 'puppeteer-core';

const app = express();
const port = 3000;

app.get('/pdf', async (req, res) => {
  const url = req.query.url as string;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating PDF');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 