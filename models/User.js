module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullname: {
      type:DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Photo);
      }
    }
  });

  return User;
};