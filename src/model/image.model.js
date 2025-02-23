import { DataTypes } from "sequelize";
import { sequelize } from "../configs/sequelize/init.sequelize.js";

const image = sequelize.define(
    "image",
    {
        image_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4, // Tạo UUID v4 tự động cho trường này
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        alt: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: '',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        public_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID, // Sử dụng UUID cho user_id
            allowNull: false,
        }
    },
    {
        tableName: 'images',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    }
);

// Sync the model with database
(async () => {
    try {
        await image.sync();
        console.log('Tạo bảng images thành công');
    } catch (error) {
        console.error('Lỗi tạo bảng images:', error);
    }
})();

export default image;
