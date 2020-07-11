/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "clients",
    {
      idCliente: {
        field: "id",
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nomeCliente: {
        field: "nome_cliente",
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "clients",
      timestamps: true,
    }
  );
};
