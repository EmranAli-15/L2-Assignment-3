import { Availability } from "./availability.model"

const checkedAvailability = async (date: string) => {
    const result = await Availability.find({ date: date });
    return result;
};


export const availabilityServices = {
    checkedAvailability
};