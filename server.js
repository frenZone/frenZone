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
const db = require('./models');
const User = db.User;
const Photo = db.Photo;
const Location = db.Location;


app.use(express.static('./src/public'));
app.use(bp.urlencoded({extended : true}));


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;

app.get('/get', (req, res) => {
  var val = req.query.search;
  console.log(this.token);
  var apiArr = [
  "http://api.instagram.com/v1/users/55870965/media/recent/?count=99&&access_token=55870965.2c4aaae.e0dd1784350a44838eda4573296a5750",
  "http://api.instagram.com/v1/users/175690487/media/recent/?count=99&&access_token=175690487.02eff85.ba29a57614cf43ddb14034f110153c76",
  'http://api.instagram.com/v1/media/search?lat=21.2922381&lng=-157.8237538&distance=5000&access_token=4120053413.02eff85.2d5b2829f52046549e0f2a92ac0655c6',
  'http://api.instagram.com/v1/users/1639523138/media/recent/?count=99&&access_token=1639523138.02eff85.d94a89d9f62d4c04a42233a9675da020',
  'http://api.instagram.com/v1/users/196312792/media/recent/?count=99&&access_token=196312792.0f4f10a.e1911280307a478fb82448f6d6282be8'

  ];

  apiArr.forEach((url)=>{
    request(url, (err, resp, body) => {
      body = JSON.parse(body);
      var data = [];
      for(let i = 0; i < body.data.length; i++){
        if(body.data[i].location !== null){
          let description;
          if(body.data[i].caption === null){
            description = "Photo taken at " + body.data[i].location.name;
          } else {
            description = body.data[i].caption.text;
          }
          User.upsert({
            id: body.data[i].user.id,
            username: body.data[i].user.username,
            fullname: body.data[i].user.full_name,
            profilePicture: body.data[i].user.profile_picture
          });
          Location.upsert({
            id: body.data[i].location.id,
            name: body.data[i].location.name,
            latitude: body.data[i].location.latitude,
            longitude: body.data[i].location.longitude
          });
          Photo.upsert({
            id: body.data[i].id,
            description: description,
            url: body.data[i].images.low_resolution.url,
            LocationId: body.data[i].location.id,
            UserId: body.data[i].user.id,
          });
        }
      }
    });
  });
  res.redirect('/default');
});

app.get('/api/locations', (req, res) =>{
  Location.findAll({
    order: [['name', 'ASC']]
  })
  .then((data)=>{
    res.jsonp({data});
  });
});

app.get('/api/users', (req, res) =>{
  User.findAll({
    order: [['username', 'ASC']]
  })
  .then((data)=>{
    res.jsonp({data});
  });
});

app.get('/api/photos', (req, res) =>{
  Photo.findAll({
    include: [User, Location]
  })

  .then((data)=>{
    res.jsonp({data});
  });
});

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