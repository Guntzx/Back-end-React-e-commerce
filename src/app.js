import express from 'express';
import mongoose from 'mongoose';
import rutas from './routes/router';
import 'dotenv/config'

mongoose.connect(process.env.MONGO)

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(rutas);

export default app;