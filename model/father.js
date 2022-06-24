import { getData } from "./db.js";
import { DataTypes } from "sequelize";
import Sequelize from 'sequelize';
import { getSon } from "./son.js";


const Father = getData.sequelizeClient.define('cat_father', {
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
    lastNamef: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastNamem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Father.hasMany(getSon,{ foreignKey: 'catFatherId'});
getSon.belongsTo(Father);

export const getFather = Father;