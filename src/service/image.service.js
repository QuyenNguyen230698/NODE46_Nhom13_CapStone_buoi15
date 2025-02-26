import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { prisma } from '../configs/prisma/init.prisma.js';
import { responseError } from '../configs/response/response.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'capstone' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

const imageService = {
    uploadImage: async (req) => {
        try {
            if (!req.file) {
                return responseError('No image file provided');
            }

            const result = await streamUpload(req.file.buffer);

            return result;
        } catch (error) {
            return responseError(`Failed to upload image: ${error.message}`);
        }
    },
    createImage: async (req) => {
        try {
            const { url, title, description, public_id, user_id } = req.body;
  
            const result = await prisma.images.create({
              data: {
                url,
                title,
                alt: req.body.title,
                description,
                public_id,
                user_id
              }
            });
  
            return result;
        } catch (error) {
            return responseError(`Failed to create image: ${error.message}`);
        }
    },
    deleteImage: async (req) => {
        const { image_id, public_id } = req.body;
        try {
            // First check if image exists in database
            const image = await prisma.images.findFirst({
                where: { public_id }
            });

            if (!image) {
                return responseError('Image not found');
            }

            // Delete from Cloudinary
            await cloudinary.uploader.destroy(public_id);

            await prisma.comments.deleteMany({
                where: { image_id: image_id }
            })

            // Delete from database
            await prisma.images.delete({
                where: { image_id: image_id }
            });

            return { message: 'Image deleted successfully' };
        } catch (error) {
            return responseError(`Failed to delete image: ${error.message}`);
        }
    },
    avatarImage: async (req) => {
        try {
            if (!req.file) {
                return responseError('No image file provided');
            }

            const result = await streamUpload(req.file.buffer);

            return result;
        } catch (error) {
            return responseError(`Failed to upload image: ${error.message}`);
        }
    },
    commentImage: async (req) => {
        try {
            const { image_id, user_id, content } = req.body;
            const image = await prisma.images.findFirst({
                where: { image_id }
            })

            if (!image) {
                return responseError('Image not found');
            }

            const result = await prisma.comments.create({
                data: {
                    image_id,
                    user_id,
                    content
                }
            })

            return result;
        } catch (error) {
            return responseError(`Failed to comment image: ${error.message}`);
        }
    },
    getDataImage: async (req) => {
        try {
            let { page, pageSize, user_id, search } = req.query;
            page = +page > 0 ? +page : 1;
            pageSize = +pageSize > 0 ? +pageSize : 10;
            user_id = +user_id > 0 ? +user_id : undefined;
            search = search || ``;

            const whereUserId = user_id === undefined ? {} : {user_id: user_id}
            const whereSearch = search.trim() === `` ? {} : {image_name: {contains: search}}
            const where = {...whereUserId, ...whereSearch}

            const skip = ( page -1 ) * pageSize;
            const totalItem = await prisma.images.count()
            const totalPage = Math.ceil(totalItem / pageSize)

            const result = await prisma.images.findMany({
                where: where,
                skip,
                take: pageSize,
                orderBy: {
                    created_at: 'desc'
                }
            });
            return {
                page,
                pageSize,
                totalPage,
                totalItem,
                data: result || []
            };
        } catch (error) {
            return responseError(`Failed to get data image: ${error.message}`);
        }
    },
    postDataImage: async (req) => {
        try {
            const { user_id } = req.body;
            const result = await prisma.images.findMany({
                where: { user_id },
                orderBy: {
                    created_at: 'desc'
                }
            })
    
            return result;
        } catch (error) {
            return responseError(`Failed to post data image: ${error.message}`);
        }
    },
    listComment: async (req) => {
        try {
            const { image_id } = req.query;
            const result = await prisma.comments.findMany({
                where: { image_id },
                orderBy: {
                    created_at: 'desc'
                }
            })
    
            return result;
        } catch (error) {
            return responseError(`Failed to list comment: ${error.message}`);
        }
    }
};

export default imageService;
