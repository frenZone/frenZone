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
    LocationId:{
      type: DataTypes.TEXT
    },
    UserId:{
      type: DataTypes.TEXT
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