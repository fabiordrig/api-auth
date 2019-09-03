/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true
    },
    email: {
			type: DataTypes.STRING,
      allowNull: false
		},
    senha_hash: {
			type: DataTypes.STRING,
      allowNull: false
		},
  }, {
		tableName: 'cliente',
		timestamps: true
	});
}