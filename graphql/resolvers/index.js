const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const fileResolver = require("./fileUpload");
module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length,
    },
    Query: postsResolvers.Query,

    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...fileResolver.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription,
    },
};