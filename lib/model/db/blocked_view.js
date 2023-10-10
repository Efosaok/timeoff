module.exports = function(sequelize, DataTypes) {
  const BlockedView = sequelize.define('BlockedView', {
    name : {
            type      : DataTypes.STRING,
            allowNull : false
        },
        date : {
            type         : DataTypes.DATE,
            allowNull    : false,
            unique: true,
        },
  }, {
    indexes : [
      {
        fields : ['companyId', 'departmentId'],
      }
    ],
    classMethods: {
      associate: function( models ) {
          BlockedView.belongsTo(models.Company, { as : 'company' });
          BlockedView.belongsTo(models.Department, { as: 'department' });
      },
    }
  })

  return BlockedView;
};
