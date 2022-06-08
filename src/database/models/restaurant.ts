import { DataTypes, Sequelize, Model, Optional } from "sequelize";
import { ReviewInstance } from "./review";

export interface RestaurantAttributes {
    id: number
    name: string
    description: string
    phone: string
    address: string
}

export interface RestaurantInput extends Optional<RestaurantAttributes, 'id'> { }

export interface RestaurantInstance extends Model<RestaurantAttributes, RestaurantInput>, RestaurantAttributes {
    reviews?: ReviewInstance[]
}

export default function (sequelize: Sequelize) {
    const Restaurant = sequelize.define<RestaurantInstance, RestaurantAttributes>('restaurants', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return Restaurant
}