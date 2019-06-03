module.exports = (sequelize, DataType) => {
  return sequelize.define('SupportAdmin', {
    AdminID: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      AllowNull: false
    },
    Name: {
      type: DataType.TEXT,
      AllowNull: false
    }
  });
};
