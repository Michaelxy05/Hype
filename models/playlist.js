module.exports = function(sequelize, DataTypes) {
  var Playlist = sequelize.define("Playlist", {
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    song: {
      type: DataTypes.STRING,
      allowNull: false
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  return Playlist;
};
