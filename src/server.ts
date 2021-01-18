import express from 'express';
import config from './app/config';
import loaderApp from './app';

const app = express();

// Load App
loaderApp(app);

app.listen(config.app.PORT as number, config.app.HOST, () => {
    console.log(`Server listen on PORT ${config.app.PORT}`);
});
