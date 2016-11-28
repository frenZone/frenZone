//Essentials
const express = require('express');
const app = express();
const bp = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const request = require('request');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const api = require('./routes/api');
const db = require('./models');
const User = db.User;
const Photo = db.Photo;
const Location = db.Location;


app.use(express.static('./src/public'));
app.use(bp.urlencoded({extended : true}));
app.use('/api', api);

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;

if (isDeveloping) {
  app.set('host', 'http://localhost');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  const response = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, 'dist/index.html')));
    res.end();
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', response);
} else {
  app.use(express.static(`${__dirname}/dist`));
  app.get('*', (req, res) => {
    res.write(
      fs.readFileSync(path.resolve(__dirname, 'dist/index.html'))
    );
  });
}



app.get('/write', (req, res) => {
  User.Create({
    id: data.data[i].user.username,
    fullname: data.data[i].user.full_name,
    profilePicture: data.data[i].user.profile_picture
  });

  Location.Create({
    id: data.data[i].location.id,
    name: data.data[i].location.name,
    latitude: data.data[i].location.latitude,
    longitude: data.data[i].location.longitude
  });

  Photo.Create({
    id: data.data[i].id,
    description: data.data[i].caption.text,
    url: data.data[i].images.low_resolution,
    locationID: data.data[i].location.id,
    UserID: data.data[i].user.id
  });
});



const onStart = (err) => {
  if (err) {
    throw new Error(err);
  }
  console.info(
    `==> 🌎 Listening on port ${port}. ` +
    `Open up http://localhost:${port}/ in your browser.`
  );
};

app.listen(port, 'localhost', onStart);

module.exports = app;