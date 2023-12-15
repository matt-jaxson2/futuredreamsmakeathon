import express from 'express';

const app = express();
const port = 5174;

// Middleware to handle CORS.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to return JSON data.
app.get('/data', (req, res) => {
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const jsonData = [
  {
      "name": "Christopher Constantinopolitanou",
      "image_small": "https://picsum.photos/seed/1/100/100",
      "image_medium": "https://picsum.photos/seed/1/320/320",
      "message": "Lots of content here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "highlight": false,
      "id": "id1"
  },
  {
      "name": "Alice Smith",
      "image_small": "https://picsum.photos/seed/2/100/100",
      "image_medium": "https://picsum.photos/seed/2/320/320",
      "message": "HTML tags added here. <a href=\"/somedodgylink\" onclick=\"console.log(error)\"> Sed ut perspiciatis unde</a> omnis iste natus <br>error sit voluptatem <b>accusantium</b> doloremque.",
      "highlight": false,
      "id": "id2"
  }
];

for (let i = 20; i < 200; i++) {
    jsonData.push({
        "name": "David Johnson",
        "image_small": `https://picsum.photos/seed/${i}/100/100`,
        "image_medium": `https://picsum.photos/seed/${i}/320/320`,
        "message": `This is record ${i}'s message.`,
        "highlight": false,
        "id": `id${i}`
    });
}
