import { Request, Response } from "express";
import customerService from "../services/customer-service";

export default {
    index: async (req: Request, res: Response) => {
        try {
            const customers = await customerService.findAll()
            return res.json(customers)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async save(req: Request, res: Response) {
        const { name, phone } = req.body
        try {
            const customer = await customerService.save({ name, phone })
            return res.status(201).json(customer)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const { name, phone } = req.body
        try {
            await customerService.updateById(id, { name, phone })
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
            await customerService.deleteById(id)
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
            const customer = await customerService.getAverageReviews(id)
            return res.json(customer)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}