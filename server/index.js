// external import
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// internal import
import connectionToDB from './config/dbConnection.js';
import errorHandler from './middlewares/errorMiddleware.js';
import passwordRoute from './routes/passwordRoutes.js';
import socialMediaRoutes from './routes/socialMediaRoutes.js';
import userRoute from './routes/userRoutes.js';
import passport from './utils/passportAuth.js';

// environment configuration
dotenv.config();

// app objects
const app = express();

// cors policy
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// cookie session
app.use(
  cookieSession({
    name: 'session',
    keys: ['ali'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// body parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

// database configuration
connectionToDB();

app.use(express.static('./public/uploads/'));

// route handling
app.use('/user', userRoute);
app.use('/password', passwordRoute);
app.use('/auth', socialMediaRoutes);

// error handling
app.use(errorHandler);

// listening the server
app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});
