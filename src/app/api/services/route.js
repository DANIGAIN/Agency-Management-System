import { NextResponse } from 'next/server'
import { connect } from '@/db/dbConfig'
import CustomError from '@/utils/Error'
import Service from '@/modals/serviceModel';

await connect();
export async function POST(req) {
    try {
        const body = await req.json()
        body.price = parseInt(body.price);
        body.time = parseInt(body.time);
        
        const service = await Service.create(body)
        body._id = service._id;
        return NextResponse.json({
            success: true,
            data: body,
            message: "create a new service",
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}
export async function GET(req) {
    try {
        const data = await Service.find()
            .sort({'createdAt':-1}) 
            .populate([
                { path: 'category', select: '-createdAt -updatedAt -__v' },
                { path: 'uid', select: 'name' }
            ])
            .select('-createdAt -updatedAt -__v')
            .exec();
        return NextResponse.json({
            success: true,
            data,
            message: "Get all the services",
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json(CustomError.internalServerError(error), { status: 500 });
    }
}