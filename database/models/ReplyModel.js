module.exports = (sequelize, DataType) => {
  return sequelize.define('Reply', {
    ReplyID: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      AllowNull: false
    },
    QueryID: {
      type: DataType.UUID,
      AllowNull: false
    },
    Message: {
      type: DataType.TEXT,
      AllowNull: false,
    },
    RepliedAt: {
      type: DataType.DATE,
      AllowNull: false
    },
    RepliedBy: {
      type: DataType.UUID,
      AllowNull: false
    },
    Name: {
      type: DataType.TEXT,
      AllowNull: false
    }
  });
};
