module.exports = function(sequelize, DataTypes) {
  var Token = sequelize.define("Token", {
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hostId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    playlistId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "placeholder"
    }
  });
  return Token;
};
