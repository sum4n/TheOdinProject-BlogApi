#! /usr/bin/env node

console.log(
  'This script populates some test books, users, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

// const user = require("./models/user");
const User = require("./models/user");
const Post = require("./models/post");
const Comment = require("./models/comment");

const users = [];
const comments = [];
const posts = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  // Drop previous collections.
  await dropCollections();

  // Add collections
  await createUsers();
  await createComments();
  await createPosts();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// Drop collection
async function dropCollections() {
  try {
    await User.deleteMany({});
    await Promise.all([
      User.deleteMany({}),
      Comment.deleteMany({}),
      Post.deleteMany({}),
    ]);
    console.log("All collections have been dropped successfully");
  } catch (err) {
    console.log(err);
  }
}

// Add Users
async function userCreate(
  index,
  first_name,
  last_name,
  username,
  email,
  password,
  type
) {
  const userdetail = {
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: password,
    user_type: type,
  };

  const user = new User(userdetail);

  await user.save();
  users[index] = user;
  console.log(`Added user: ${first_name} ${last_name}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "Suman", "Das", "sdas", "s@das.com", "111111", "admin"),
    userCreate(1, "Ben", "Bova", "ben", "ben@bova.com", "abc123"),
    userCreate(2, "Isaac", "Asimov", "isaac", "isaac@asi.com", "abc123"),
    userCreate(3, "Bob", "Billings", "bob", "bob@bill.com", "abc123"),
    userCreate(4, "Jim", "Jones", "jim", "jim@jon.com", "abc123"),
  ]);
}

// Add Comments
async function commentCreate(index, content, author) {
  const commentDetail = { content: content, author: author };

  const comment = new Comment(commentDetail);

  await comment.save();
  comments[index] = comment;
  console.log(`Added comment: ${content}`);
}

async function createComments() {
  console.log("Adding comments");
  await Promise.all([
    commentCreate(0, "Comment 1", users[1]),
    commentCreate(1, "Comment 2", users[2]),
    commentCreate(2, "Comment 3", users[2]),
    commentCreate(3, "Comment 4", users[3]),
    commentCreate(4, "Comment 5", users[4]),
  ]);
}

// Add Posts
async function postCreate(index, title, content, author, comments) {
  const postDetail = {
    title: title,
    content: content,
    author: author,
  };

  if (comments != false) {
    postDetail.comments = comments;
  }

  const post = new Post(postDetail);

  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(0, "Title 1", "Post Content 1", users[0], [comments[0]]),
    postCreate(1, "Title 2", "Post Content 2", users[0], [comments[1]]),
    postCreate(2, "Title 3", "Post Content 3", users[0], [comments[2]]),
    postCreate(3, "Title 4", "Post Content 4", users[0], [comments[3]]),
    postCreate(4, "Title 5", "Post Content 5", users[0], [comments[4]]),
  ]);
}
