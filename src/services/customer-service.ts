import { Customer } from "../database"
import { CustomerInput } from "../database/models/customer"

export default {
    async findAll() {
        const customers = await Customer.findAll()
        return customers
    },

    async save(input: CustomerInput) {
        const customer = await Customer.create(input)
        return customer
    },

    async updateById(id: string | number, input: CustomerInput) {
        await Customer.update(input, {
            where: { id }
        })
    },

    async deleteById(id: string | number) {
        await Customer.destroy({
            where: { id }
        })
    },

    async getAverageReviews(id: string | number) {
        const customer = await Customer.findByPk(id, {
            attributes: ['id', 'name'],
            include: {
                association: 'reviews',
                attributes: [
                    ['restaurant_id', 'restaurantId'],
                    'stars',
                    'comment'
                ]
            }
        })

        if (customer === null) return null

        const averageStarsGiven = customer.reviews
            ? customer.reviews.reduce((acum, review) => review.stars + acum, 0) / customer.reviews.length
            : 0
        
        return {
            customerId: customer.id,
            customerName: customer.name,
            averageStarsGiven,
            reviews: customer.reviews
        }
    }
}