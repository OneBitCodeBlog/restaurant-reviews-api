import { connect } from "./connect";
import customer from "./models/customer";
import restaurant from "./models/restaurant";
import review from "./models/review";

const sequelize = connect()

const Customer = customer(sequelize)
const Restaurant = restaurant(sequelize)
const Review = review(sequelize)

Customer.hasMany(Review)

Restaurant.hasMany(Review)

Review.belongsTo(Customer)
Review.belongsTo(Restaurant)

export {
    sequelize,
    Customer,
    Restaurant,
    Review
}