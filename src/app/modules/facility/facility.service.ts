/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { IFacility } from './facility.interface'
import { Facility } from './facility.model'

const createFacilityIntoDB = async (payload: IFacility) => {
  // check if the facility exists
  const facility = await Facility.findOne({ name: payload?.name })
  if (facility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility already exists')
  }
  const result = await Facility.create(payload)
  return result
}

// get single facility
const getSingleFacilityFromDB = async (id: string) => {
  const isFacilityExists = await Facility.findById(id)
  if (!isFacilityExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility not found!')
  }
  const isDeletedFacility = isFacilityExists.isDeleted
  if (isDeletedFacility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility already deleted!')
  }
  return isFacilityExists
}

// get all facilities
const getAllFacilitiesFromDB = async () => {
  const isFacilitiesExists = await Facility.find()
  if (isFacilitiesExists.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facilities not found!')
  }
  return isFacilitiesExists
}

const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<IFacility>,
) => {
  // check if the facility exists
  const facility = await Facility.isFacilityExists(id)
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found!')
  }
  const isDeletedFacility = facility?.isDeleted
  if (isDeletedFacility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility already deleted!')
  }

  //   Update the facility document
  const updateFacility = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  })

  return updateFacility
}

// delete facility (softDelete) from db
const deleteFacilityFromDB = async (id: string) => {
  const facility = await Facility.isFacilityExists(id)
  if (!facility) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found!')
  }
  const isDeletedFacility = facility.isDeleted
  if (isDeletedFacility) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Facility already deleted!')
  }

  const result = await Facility.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const FacilityServices = {
  createFacilityIntoDB,
  getSingleFacilityFromDB,
  getAllFacilitiesFromDB,
  updateFacilityIntoDB,
  deleteFacilityFromDB,
}
