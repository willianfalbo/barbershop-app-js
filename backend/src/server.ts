// import 'reflect-metadata'; //////////////////////// CHECK IF IT IS NECESSARY
import express from 'express';
import routes from './routes';
import './database';
import uploadConfig from './config/upload.config';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Listening on port 3333');
});
