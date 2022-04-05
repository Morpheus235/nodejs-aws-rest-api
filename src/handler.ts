import {APIGatewayEvent, Handler} from 'aws-lambda';
import {productsRoute} from "./modules/api";

/**
 * @function Hello
 * @description Handler for Serverless Hello Service
 * @param event <APIGatewayEvent>
 * @returns Promise <APIResponse|APIErrorResponse>
 */
export const products: Handler = (event: APIGatewayEvent) => productsRoute(event);

