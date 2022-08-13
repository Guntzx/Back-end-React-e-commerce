import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import rutas from './routes/router';
import 'dotenv/config'

mongoose.connect(process.env.MONGO)

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.use(cookieParser());

app.use(rutas);

export default app;