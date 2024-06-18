import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await Facility.create(payload);
    return result;
};

const updateFacilityIntoDB = async (id: string, payload: Partial<TFacility>) => {
    const result = await Facility.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
};

const deleteFacilityFromDB = async (id: string) => {
    const result = await Facility.findByIdAndUpdate(id, {
        isDeleted: true
    },
        { new: true });
    return result;
};


export const facilityServices = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
};