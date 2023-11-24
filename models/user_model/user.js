// const {PrismaClient}=require("@prisma/client");
// const prisma=new PrismaClient();

// const bcrypt = require("bcrypt");

// class User {
//   constructor(user) {
//     this.id = user.id;
//     this.username = user.username;
//     this.email = user.email;
//     this.password = user.password;
//   }

//   static async create(user, callback) {
//     try {
//       prisma.user.create({user});
//       return ;

//     } catch (err) {
//       console.log("error: ", err);
//       throw err;
//     }
//   }

// }

// module.exports = User;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

class User {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
  }

  static async create(newUser, callback) {
    try {
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const createdUser = await prisma.user.create({
        data: {
          username: newUser.username,
          email: newUser.email,
          password: hashedPassword,
        },
      });
      return createdUser;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  static async findByEmail(email, callback) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email
        },
      });
      callback=user;
      return callback;
    } catch (err) {
      console.log('Error finding user by email: ', err);
      throw err;
    }
  }

  static async findById(id, callback) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }

  static async update(updatedUser, callback) {
    try {
      const user = await prisma.user.update({
        where: {
          id: updatedUser.id,
        },
        data: {
          username: updatedUser.username,
          email: updatedUser.email,
          password: updatedUser.password,
          // Add other fields here for update if needed
        },
      });
      return user;
    } catch (err) {
      console.log('error: ', err);
      throw err;
    }
  }
}

module.exports = User;
