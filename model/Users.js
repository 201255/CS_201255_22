import { getData } from './db.js';
import Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import { getFather } from "./father.js";

const User = getData.sequelizeClient.define('cat_users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: 'this username is alredy taken.'
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: DataTypes.STRING,
},
    {
        tableName: 'cat_users',
        freezeTableName: true,
        hooks: {
            beforeCreate: (user, options) => {
                {
                    user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
                }
            }
        }
    });

User.hasMany(getFather, {
    foreignKey: 'catUserId'
});
getFather.belongsTo(User);

export const getUser = User;