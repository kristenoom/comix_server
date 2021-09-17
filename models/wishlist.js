module.exports = function (sequelize, DataTypes) {
    const Wishlist = sequelize.define('wishlist', {
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Wishlist;
    
};