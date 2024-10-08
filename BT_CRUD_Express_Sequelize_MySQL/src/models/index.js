import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';
// Lấy đường dẫn đến tệp hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn đến tệp cấu hình
const configPath = path.resolve(__dirname, '../config/config.json');
const configFile = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
// import configFile from '../config/config.json' assert { type: 'json' };

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(async file => {
    const modelPath = new URL(file, import.meta.url).pathname;
    const model = (await import(modelPath)).default(sequelize, Sequelize.DataTypes);
    //const model = (await import(path.join(__dirname, file))).default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
