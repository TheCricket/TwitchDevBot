module.exports = (sequelize, DataType) => {
  return sequelize.define('Query', {
    QueryID: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      AllowNull: false
    },
    Name: {
      type: DataType.TEXT,
      AllowNull: false
    },
    OpenedAt: {
      type: DataType.DATE,
      AllowNull: false
    },
    Message: {
      type: DataType.TEXT,
      AllowNull: false,
    },
    CategoryID: {
      type: DataType.UUID,
      AllowNull: true
    },
    Resolved: {
      type: DataType.BOOLEAN,
      AllowNull: false,
      defaultValue: false
    },
    ClosedBy: {
      type: DataType.UUID,
      AllowNull: true
    },
    ClosedAt: {
      type: DataType.DATE,
      AllowNull: true
    }
  });
};
