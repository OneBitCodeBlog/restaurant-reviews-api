import { Request, Response } from "express";
import restaurantService from "../services/restaurant-service";
import reviewService from "../services/review-service";

export default {
    async index(req: Request, res: Response) {
        try {
            const restaurants = await restaurantService.findAll()
            return res.json(restaurants)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async save(req: Request, res: Response) {
        const { name, description, phone, address } = req.body
        try {
            const restaurant = await restaurantService.save({
                name,
                description,
                phone,
                address
            })
            return res.status(201).json(restaurant)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { name, description, phone, address } = req.body
        try {
            await restaurantService.updateById(id, { name, description, phone, address })
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        try {
            await restaurantService.deleteById(id)
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async averageReviews(req: Request, res: Response) {
        const { id } = req.params
        try {
            const restaurant = await restaurantService.getAverageReviews(id)
            return res.json(restaurant)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async addReview(req: Request, res: Response) {
        const restaurantId = Number(req.params.id)
        const { customerId, stars, comment } = req.body
        try {
            const review = await reviewService.save({ restaurantId, customerId, stars, comment })
            return res.status(201).json(review)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async updateReview(req: Request, res: Response) {
        const restaurantId = Number(req.params.id)
        const { customerId, stars, comment } = req.body
        try {
            await reviewService.update({ restaurantId, customerId, stars, comment })
            return res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async topFive(req: Request, res: Response) {
        try {
            const topFive = await restaurantService.getTopFive()
            return res.json(topFive)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}