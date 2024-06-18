import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const getAllFacilityFromDB = async () => {
    const result = await Facility.find();
    return result;
}

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
    getAllFacilityFromDB,
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB
};