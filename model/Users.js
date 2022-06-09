import { getData } from './db.js';
import Sequelize from 'sequelize';

const User = getData.sequelizeClient.define('tbl_usersdb',{
    id: { type: Sequelize.SMALLINT, primaryKey: true, autoIncrement:true},
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    phone_number: Sequelize.STRING,
}, {
    tableName: 'tbl_usersdb'
});

export const getUser = User;