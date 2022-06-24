import { getData } from "./db.js";
import { DataTypes } from "sequelize";
import Sequelize from 'sequelize';

const Son = getData.sequelizeClient.define ('cat_sons',{
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
    },
  
})

export const getSon = Son;