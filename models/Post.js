const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    // add properites here, ex:
    Post: {
         type: DataTypes.STRING,
         allowNull:false
    }
},{
    sequelize
});

module.exports=Post