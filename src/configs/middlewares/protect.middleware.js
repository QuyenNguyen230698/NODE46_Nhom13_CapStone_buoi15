
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_SECRET } from "../constant/app.constant.js"

import { prisma } from "../prisma/init.prisma.js"
import { responseError } from "../response/response.js"


export const project = async(req,res,next) => {
    try {
        const accessToken = req.headers.authorization?.split(' ')[1]
        const decoded = jwt.verify(accessToken,ACCESS_TOKEN_SECRET)
        console.log({decoded})
        if (!accessToken) {
            return responseError(`Access token not found`)
        }
       const user = await prisma.users.findUnique({
            where:{
                user_id:decoded.userId
            }
        })
        req.user = user
        next()
    } catch (error) {
        console.log({error})
        next(error)
    }
}