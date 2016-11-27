const express = require('express');
const router = express.Router();
const app = express();
const bp = require('body-parser');
const path = require('path');
const fs = require('fs');
const http = require('http');
const request = require('request');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');
const db = require('../models');
const User = db.User;
const Photo = db.Photo;
const Location = db.Location;

router.route('/write')
  .get((req, res) =>{
    var val = req.query.search;
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

router.route('/users')
  .get((req, res) =>{
    User.findAll({
      order: [['username', 'ASC']]
    })
    .then((data)=>{
      res.jsonp({data});
    });
  });

router.route('/locations')
  .get((req, res) => {
    Location.findAll({
      order: [['name', 'ASC']]
    })
    .then((data) => {
      res.jsonp({data});
    });
  });

router.route('/photos')
  .get((req, res) =>{
    Photo.findAll({
      include: [User, Location]
    })

    .then((data)=>{
      res.jsonp({data});
    });
  });




module.exports = router;