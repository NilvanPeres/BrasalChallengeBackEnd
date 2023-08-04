const roles = {
  ADMIN: {
    can: ['createUser', 'updateUser', 'deleteUser']
  },
  USER: {
    can: ['createUser', 'updateUser']
  }
};

module.exports = roles;
