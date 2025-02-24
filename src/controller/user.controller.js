
import { responseSuccess, responseError } from "../configs/response/response.js";
import { prisma } from "../configs/prisma/init.prisma.js";
import userService from "../service/user.service.js";

const userController = {
    getAll: async (req, res) => {
        try {
            const users = await prisma.users.findMany({
                select: {
                    user_id: true,
                    email: true,
                    full_name: true,
                    avatar: true,
                    created_at: true,
                    updated_at: true
                }
            });
            const resData = responseSuccess(users, "Get List Users Successfully", 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error('Database Error:', error);
            const resData = responseError(error, "Failed to fetch users", 500);
            res.status(resData.code).json(resData);
        }
    },

    register: async (req, res) => {
        try {
            const newUser = await userService.register(req);
            if (newUser.error) {
                const resData = responseError(newUser.error);
                return res.status(resData.code).json(resData);
            }
            const resData = responseSuccess(newUser, "Register Successfully", 201);
            res.status(resData.code).json(resData);
        } catch (error) {
            const resData = responseError(error, "Registration failed", 500);
            res.status(resData.code).json(resData);
        }
    },

    login: async (req, res, next) => {
        try {
            const user = await userService.login(req);
            const resData = responseSuccess(user, `Login Successfully`, 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            console.error('Login Error:', error);
            const resData = responseError(error, "Login failed", 500);
            res.status(resData.code).json(resData);
        }
    },
    createInfo: async (req, res, next) => {
        try {
            const newInfo = await userService.createInfo(req);
            const resData = responseSuccess(newInfo, `Create Info Successfully`, 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            next(error);
        }
    }
};

export default userController;