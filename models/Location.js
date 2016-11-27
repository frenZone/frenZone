module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define("Location", {
    name: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE
    },
    longitude: {
      type: DataTypes.DOUBLE
    }
  }, {
    classMethods: {
      associate: function(models) {
        Location.hasMany(models.Photo);
      }
    }
  });

  return Location;
};