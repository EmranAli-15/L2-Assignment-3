import { Types } from "mongoose";

export type TBooking = {
    date: string;
    startTime: string;
    endTime: string;
    user: string;
    facility: Types.ObjectId;
    payableAmount: number;
    isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
};