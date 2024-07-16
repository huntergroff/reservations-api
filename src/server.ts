import app from "./app";

// Start the server on localhost:3000
const port = 3000;

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
