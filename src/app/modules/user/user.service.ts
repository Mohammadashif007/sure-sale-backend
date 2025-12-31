import { prisma } from "../../../lib/prisma";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { IUser } from "./user.interface";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IUser) => {
    console.log(payload);
    // ! hash password
    const hashedPassword = await bcrypt.hash(
        payload.password,
        Number(envVars.BCRYPT_SALT_ROUND)
    );


    const result = await prisma.user.create({
        data: { ...payload, password: hashedPassword },
    });
    return result;
};

export const UserServices = {
    createUserIntoDB,
};
