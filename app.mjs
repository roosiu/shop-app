import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const products = [
  { id: 1, name: 'Monstera deliciosa', category: 'Rośliny', price: 249.00, image: '/images/monstera.jpg' },
  { id: 2, name: 'Maranta leuconeura', category: 'Rośliny', price: 39.00, image: '/images/maranta.jpg' },
  { id: 3, name: 'Aspidistra wyniosła', category: 'Rośliny', price: 199.00, image: '/images/aspidistra.jpg' },
  { id: 4, name: 'Podłoże do roślin', category: 'Akcesoria', price: 17.00, image: '/images/podloze.jpg' }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.use((req, res, next) => {
  res.status(404).send('Nie ma takiego routu');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
