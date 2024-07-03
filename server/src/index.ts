import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoute';
import postRoutes from './routes/postRoute';
// import crawRoutes from './routes/crawRoute';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const port = 9090;

app.get('/', (req, res) => {
  res.send('Server Is Ready!');
});

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
// app.use('/craw', crawRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
