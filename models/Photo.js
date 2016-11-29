module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    description: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: true
      }
    },
    instaCreatedTime: {
      type: DataTypes.TEXT
    },
    LocationId:{
      type: DataTypes.DOUBLE
    },
    UserId:{
      type: DataTypes.DOUBLE
    }

  }, {
    classMethods: {
      associate: function(models) {
        Photo.belongsTo(models.User);
        Photo.belongsTo(models.Location);
      }
    }
  });

  return Photo;
};