const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Otp {
    constructor(otps) {
        this.id = otps.id;
        this.email = otps.email;
        this.otp = otps.otp;
        this.create_at = otps.create_at;
    }


    static async create(newOtp, callback) {

        try {
            const createdUser = await prisma.otp.create({
                data: {
                    email: newOtp.email,
                    otp: newOtp.otp

                }
            });

            return createdUser;

        } catch (error) {
            console.log('error: ', error);
            throw error;
        }


    }

    static async findByEmail(email, callback) {
        try {
          const otp = await prisma.otp.findUnique({
            where: {
              email: email
            },
          });
          callback=otp;
          return callback;
        } catch (err) {
          console.log('Error finding user by email: ', err);
          throw err;
        }
      }

      static async deleteByEmail(email) {
        try {
            const deletedOtp = await prisma.otp.delete({
                where: {
                    email: email
                }
            });
            return deletedOtp;
        } catch (error) {
            console.log('Error deleting OTP by email: ', error);
            throw error;
        }
    }
}

module.exports=Otp;