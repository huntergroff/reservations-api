import express from 'express';
import bodyparser from 'body-parser';
import userRoutes from './users/routes';
import reservationRoutes from './reservations/routes';
import propertyRoutes from './properties/routes';

const app = express();
app.use(bodyparser.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

userRoutes(app);
reservationRoutes(app);
propertyRoutes(app);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});