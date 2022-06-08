import { Review } from "../database";
import { ReviewInput } from "../database/models/review";

export default {
    async save(input: ReviewInput) {
        const review = await Review.create(input)
        return review
    },

    async update(input: ReviewInput) {
        await Review.update(input, {
            where: {
                customerId: input.customerId,
                restaurantId: input.restaurantId
            }
        })
    }
}