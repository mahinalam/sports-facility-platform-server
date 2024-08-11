import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import Auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { FacilityController } from './facility.controller'
import { FacilityValidationSchema } from './facility.validation'

const router = express.Router()

router.post(
  '/',
  Auth(USER_ROLE.admin),
  validateRequest(FacilityValidationSchema.createFacilityValidationSchema),
  FacilityController.createFacility,
)
router.get('/', FacilityController.getAllFacilities)
router.get('/:id', FacilityController.getSingleFacility)

router.put(
  '/:id',
  Auth(USER_ROLE.admin),
  validateRequest(FacilityValidationSchema.updateFacilityValidationSchema),
  FacilityController.updateFacility,
)
router.delete('/:id', Auth(USER_ROLE.admin), FacilityController.deleteFacility)

export const FacilityRoutes = router
