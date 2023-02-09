const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Post.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(Post)

Comment.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(Comment)

Comment.belongsTo(Post,{
    onDelete:"CASCADE"
})
Post.hasMany(Comment)

module.exports = {
    User,
    Post,
    Comment
}