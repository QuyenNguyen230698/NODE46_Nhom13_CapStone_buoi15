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
  
            if (!url || !title || !description || !public_id || !user_id) {
              return responseError('Missing required fields');
            }
  
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
    deleteImage: async (public_id) => {
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

            // Delete from database
            await prisma.images.delete({
                where: { image_id: image.image_id }
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
    }
};

export default imageService;
