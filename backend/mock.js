const faker = require('faker');

const generateUsers = (qtyOfUsers = 1) => {
  return Array.from(Array(qtyOfUsers)).map(number => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    image: faker.image.imageUrl(50, 50),
    userPosts: Array.from(Array(10)).map(postNumber => ({
      id: faker.datatype.uuid(),
      title: faker.lorem.words(),
      description: faker.lorem.paragraphs(),
      time: faker.time.recent(),
    })),
  }));
};

// Mock data
const users = generateUsers(20);

// User CRUD

const createUser = (name, image) => {
  users.push({
    id: faker.datatype.uuid(),
    name,
    image,
    userPosts: [],
  });
  return {
    user: users[users.length - 1],
  };
}

const updateUser = (id, name, image) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return;
  users[userIndex] = { ...users[userIndex], name, image: image || users[userIndex].image };
  return {
    user: users[userIndex],
  };
}

const deleteUser = (id) => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) return;
  const userRemoved = users.splice(userIndex, 1);

  return {
    user: userRemoved[0],
  };
}

// Post CRUD

const createUserPost = (userID, title, description, time) => {
  const userIndex = users.findIndex(user => user.id === userID);
  if (userIndex === -1) return;

  users[userIndex].userPosts.push({
    id: faker.datatype.uuid(),
    title,
    description,
    time,
  });

  return {
    user: users[userIndex],
    post: users[userIndex].userPosts[users[userIndex].userPosts.length - 1],
  };
}

const updateUserPost = (userID, postID, title, description, time) => {
  const userIndex = users.findIndex(user => user.id === userID);
  if (userIndex === -1) return;

  const postIndex = users[userIndex].userPosts.findIndex(post => post.id === postID);
  if (postIndex === -1) return;

  users[userIndex].userPosts[postIndex] = { ...users[userIndex].userPosts[postIndex], title, description, time };

  return {
    user: users[userIndex],
    post: users[userIndex].userPosts[postIndex],
  };
}

const deleteUserPost = (userID, postID) => {
  const userIndex = users.findIndex(user => user.id === userID);
  if (userIndex === -1) return;

  const postIndex = users[userIndex].userPosts.findIndex(post => post.id === postID);
  if (postIndex === -1) return;

  const removedPost = users[userIndex].userPosts.splice(postIndex, 1);

  return {
    user: users[userIndex],
    post: removedPost[0],
  };
}

module.exports = {
  generateUsers,
  users,

  createUser,
  updateUser,
  deleteUser,

  createUserPost,
  updateUserPost,
  deleteUserPost,
}