import express from 'express';

const app = express();
const port = 5174;

// Middleware to handle CORS.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to return all or partial results.
app.get('/data', (req, res) => {
  res.json(jsonData);
});

// Route to return search results.
app.get('/search', (req, res) => {
  const searchTerm = req.query.term;

  const matchingData = jsonData.filter(item => {
    if (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return item;
    }
  });

  res.json(matchingData);
});

// Route to return specific item.
app.get('/item', (req, res) => {
  const id = req.query.id;

  const matchingData = jsonData.filter(item => {
    if (item.id === id) {
      return item;
    }
  });

  res.json(matchingData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const jsonData = [
  {
      "name": "Christopher Constantinopolitanou",
      "imageSmall": "https://picsum.photos/seed/1/100/100",
      "imageMedium": "https://picsum.photos/seed/1/320/320",
      "message": "Lots of content here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "highlight": false,
      "id": "1"
  },
  {
      "name": "Alice Smith",
      "imageSmall": "https://picsum.photos/seed/2/100/100",
      "imageMedium": "https://picsum.photos/seed/2/320/320",
      "message": "HTML tags added here. <a href=\"/somedodgylink\" onclick=\"console.log(error)\"> Sed ut perspiciatis unde</a> omnis iste natus <br>error sit voluptatem <b>accusantium</b> doloremque.",
      "highlight": false,
      "id": "2"
  },
  {
    "name": "Edward Beaney-Withington",
    "imageSmall": "https://picsum.photos/seed/3/100/100",
    "imageMedium": "https://picsum.photos/seed/3/320/320",
    "message": "Highlighted result lorem ipsum doloe sit amet doloremque.",
    "highlight": false,
    "id": "3"
  },
  {
    "name": "Alice Smith",
    "imageSmall": "https://picsum.photos/seed/4/100/100",
    "imageMedium": "https://picsum.photos/seed/4/320/320",
    "message": "Duolicate name lorem ipsum dolor doloremque.",
    "highlight": false,
    "id": "4"
},
];

for (let i = jsonData.length + 1; i < 200; i++) {
    jsonData.push({
        "name": `David Johnson${i}`,
        "imageSmall": `https://picsum.photos/seed/${i}/100/100`,
        "imageMedium": `https://picsum.photos/seed/${i}/320/320`,
        "message": `This is record ${i}'s message. Lorem ipsum dolor sit amet.`,
        "highlight": false,
        "id": `${i}`
    });
}
