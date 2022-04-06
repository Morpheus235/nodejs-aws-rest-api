import {APIGatewayEvent} from "aws-lambda";

export function productsRoute(event: APIGatewayEvent): APIResponse

export type APIResponse = {
    statusCode: number | 200;
    body?: any | null;
};

export type RequestBody = { any?: any };

export const enum StatusCodes {
    OK = 200,
    Redirect = 301,
    MissingCredentials = 401,
    Unauthorized = 403,
    NotFound = 404,
    InternalServerError = 500
}

export type ProductsBody = {
    products: any[];
}