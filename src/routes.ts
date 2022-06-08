import express from "express"
import customersController from "./controllers/customers-controller"
import restaurantsController from "./controllers/restaurants-controller"

const router = express.Router()

router.get('/customers', customersController.index)
router.get('/customers/:id/reviews', customersController.averageReviews)
router.post('/customers', customersController.save)
router.put('/customers/:id', customersController.update)
router.delete('/customers/:id', customersController.delete)

router.get('/restaurants', restaurantsController.index)
router.get('/restaurants/top-five', restaurantsController.topFive)
router.get('/restaurants/:id/reviews', restaurantsController.averageReviews)
router.post('/restaurants', restaurantsController.save)
router.post('/restaurants/:id/reviews', restaurantsController.addReview)
router.put('/restaurants/:id', restaurantsController.update)
router.put('/restaurants/:id/reviews', restaurantsController.updateReview)
router.delete('/restaurants/:id', restaurantsController.delete)

export { router }