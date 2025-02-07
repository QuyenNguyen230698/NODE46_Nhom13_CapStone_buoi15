// Define the user model based on the database schema
import { DataTypes } from "sequelize";
import { sequelize } from "../configs/sequelize/init.sequelize.js";

const user = sequelize.define(
    "user",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        pass_word: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        full_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true,
    }
);

// Sync the model with database
(async () => {
    try {
        await user.sync();
        console.log('Tạo bảng users thành công');
    } catch (error) {
        console.error('Lỗi tạo bảng users:', error);
    }
})();

export default user;