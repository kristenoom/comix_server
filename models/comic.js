module.exports = function (sequelize, DataTypes) {
    const Comix = sequelize.define('comix', {
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issue_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        read_status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Comix;
    
};