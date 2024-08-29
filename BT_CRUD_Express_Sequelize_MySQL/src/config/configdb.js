// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize('node_fullstack', 'root', 'Ngan@1023',{
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false
// });

// // Hàm kết nối cơ sở dữ liệu
// const connectDB = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database: ', error);
//     }
// };

// export { sequelize, connectDB };
import { Sequelize } from 'sequelize'; // ES6 module import

// Option 3: Passing parameters separately
const sequelize = new Sequelize('node_fullstack', 'root', 'Ngan@1023', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB; // ES6 module export