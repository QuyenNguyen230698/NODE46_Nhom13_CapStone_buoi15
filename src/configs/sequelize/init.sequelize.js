import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../constant/app.constant.js";

// Create Sequelize instance
export const sequelize = new Sequelize(DATABASE_URL, {
    logging: false,
    define: {
        freezeTableName: true
    }
});

// Test database connection
try {
    await sequelize.authenticate();
    console.log('Kết nối cơ sở dữ liệu thành công.');
} catch (error) {
    console.error('Không thể kết nối cơ sở dữ liệu:', error);
}
