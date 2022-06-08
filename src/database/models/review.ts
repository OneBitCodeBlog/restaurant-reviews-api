import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface ReviewAttributes {
    customerId: number
    restaurantId: number
    stars: number
    comment: string
}

export interface ReviewInput extends Optional<ReviewAttributes, 'comment'> { }

export interface ReviewInstance extends Model<ReviewAttributes, ReviewInput>, ReviewAttributes { }

export default function (sequelize: Sequelize) {
    const Review = sequelize.define<ReviewInstance, ReviewAttributes>('reviews', {
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'customers',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'restaurants',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[0, 1, 2, 3, 4, 5]]
            }
        },
        comment: {
            type: DataTypes.STRING
        },
    })

    return Review
}