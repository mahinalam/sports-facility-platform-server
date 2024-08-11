import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { FacilityServices } from './facility.service'

// create facility
const createFacility: RequestHandler = catchAsync(async (req, res) => {
  const facility = req.body

  const result = await FacilityServices.createFacilityIntoDB(facility)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Facility added successfully',
    data: result,
  })
})

// get single facility
const getSingleFacility: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacilityServices.getSingleFacilityFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Facility retrieved successfully',
    data: result,
  })
})
// get all facilities
const getAllFacilities: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilitiesFromDB()
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Facilities retrieved successfully',
    data: result,
  })
})

// update facility
const updateFacility: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await FacilityServices.updateFacilityIntoDB(id, payload)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Facility updated successfully',
    data: result,
  })
})

// delete facility
const deleteFacility: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacilityServices.deleteFacilityFromDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Facility deleted successfully',
    data: result,
  })
})

export const FacilityController = {
  createFacility,
  getSingleFacility,
  getAllFacilities,
  updateFacility,
  deleteFacility,
}
