import { prisma } from "../configs/prisma/init.prisma.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { responseError } from "../configs/response/response.js";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET } from "../configs/constant/app.constant.js";

const userService = {
    userList: async () => {
        try {
            return await prisma.users.findMany({
                select: {
                    user_id: true,
                    email: true,
                    full_name: true,
                    avatar: true,
                    created_at: true,
                    updated_at: true
                }
            });
        } catch (error) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    },
    register: async (req) => {
        const { email, password, pass_word: passWordAlias, full_name } = req.body;
        const pass_word = password || passWordAlias;
        const user = await prisma.users.findFirst({
           where: {
              email,
           },
        });
        if (user) {
            return responseError(`User already exists`);
        };
  
        const hashPassword = bcrypt.hashSync(pass_word, 10);
        const userNew = await prisma.users.create({
          data: {
              email,
              pass_word: hashPassword,
              full_name
          }
        })

        delete userNew.pass_word
        return userNew;
    },
    login: async (req) => {
        const { email, password, pass_word: passWordAlias } = req.body;
        const pass_word = password || passWordAlias;
        const usersExists = await prisma.users.findFirst({
           where: {
              email,
           },
        });
        if (!usersExists) {
            return responseError(`User not found`);
       };
  
       const checkPassword = bcrypt.compareSync(pass_word, usersExists.pass_word)
       if(!checkPassword) {
          return responseError(`Password incorrect`);
       }
       const tokens = await userService.createToken(usersExists.user_id)
       return {
        user: usersExists,
        tokens
       }
    },
     createToken: async (userId) => {
        if (!userId) {
           return responseError(`Account not confirmed`);
        }
        const tokenAccess = jwt.sign({userId:userId}, ACCESS_TOKEN_SECRET,{expiresIn:ACCESS_TOKEN_EXPIRES})
  
        const refreshToken = jwt.sign({userId:userId}, REFRESH_TOKEN_SECRET,{expiresIn:REFRESH_TOKEN_EXPIRES})
  
        return {
           accessToken:tokenAccess,
           refreshToken:refreshToken
        }
  
    },
    createInfo: async (req) => {
        try {
            const { user_id, email,password ,pass_word:passWordAlias, full_name, avatar } = req.body;
      
            if (!email || !full_name || !avatar || !user_id) {
              return responseError('Missing required fields');
            }
      
            // Check if user exists
            const existingUser = await prisma.users.findUnique({
              where: { user_id: Number(user_id) }
            });

            if (!existingUser) {
              return responseError('User not found');
            }
            const pass_word = password || passWordAlias;
            const hashPassword = bcrypt.hashSync(pass_word, 10);

            // Update user information
            const result = await prisma.users.update({
              where: { user_id: Number(user_id) },
              data: {
                email,
                pass_word: hashPassword,
                full_name,
                avatar
              },
              select: {
                user_id: true,
                email: true,
                pass_word: true,
                full_name: true,
                avatar: true,
                created_at: true,
                updated_at: true
              }
            });
      
            return result;
        } catch (error) {
            if (error.code === 'P2002') {
              return responseError('Email already exists');
            }
            return responseError(`Failed to update user information: ${error.message}`);
        }
    }
};

export default userService;