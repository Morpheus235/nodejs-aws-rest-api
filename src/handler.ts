import {APIGatewayEvent, Handler} from 'aws-lambda';
import {productsRoute} from "./modules/api";

/**
 * @function Prducts
 * @description Handler for Serverless Products Service
 * @param event <APIGatewayEvent>
 * @returns Promise <APIResponse>
 */
export const products: Handler = (event: APIGatewayEvent) => productsRoute(event);

