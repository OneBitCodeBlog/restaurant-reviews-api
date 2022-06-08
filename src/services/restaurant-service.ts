import { Restaurant } from "../database"
import { RestaurantInput, RestaurantInstance } from "../database/models/restaurant"


export default {
    async findAll() {
        const restaurants = await Restaurant.findAll()
        return restaurants
    },

    async save(input: RestaurantInput) {
        const restaurant = await Restaurant.create(input)
        return restaurant
    },

    async updateById(id: string | number, input: RestaurantInput) {
        await Restaurant.update(input, {
            where: { id }
        })
    },

    async deleteById(id: string | number) {
        await Restaurant.destroy({
            where: { id }
        })
    },

    async getAverageReviews(id: string | number) {
        const restaurant = await Restaurant.findByPk(id, {
            attributes: ['id', 'name'],
            include: {
                association: 'reviews',
                attributes: [
                    ['customer_id', 'customerId'],
                    'stars',
                    'comment'
                ]
            }
        })

        if (restaurant === null) return null

        const averageStarsReceived = restaurant.reviews
            ? restaurant.reviews.reduce((acum, review) => review.stars + acum, 0) / restaurant.reviews.length
            : 0

        return {
            restaurantId: restaurant.id,
            averageStarsReceived,
            reviews: restaurant.reviews
        }
    },

    async getTopFive() {
        const restaurants = await Restaurant.findAll({
            attributes: ['id', 'name'],
            include: {
                association: 'reviews',
                attributes: [
                    'stars'
                ]
            }
        })

        const topFive = restaurants.map(restaurant => {
            const averageReviews = restaurant.reviews
                ? restaurant.reviews.reduce((accum, review) => review.stars + accum, 0) / restaurant.reviews.length
                : 0

            return {
                ...restaurant.get(),
                averageReviews
            }
        })
            .sort((a, b) => b.averageReviews - a.averageReviews)
            .slice(0, 5)

        return topFive
    }
}