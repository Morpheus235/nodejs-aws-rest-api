import {APIGatewayEvent} from 'aws-lambda';
import {APIResponse, ProductsBody, RequestBody, StatusCodes} from "../types/api";
import {getCustomerData, getCustomerProductAvailability} from "./database";
import {parseJson} from "../lib/utils";
import {queryServiceA} from "./serviceA";
import {Customer, Product} from "../types/database";

/**
 * @function Products
 * @description API Handler for Products Service
 * @param event <APIGatewayEvent>
 * @returns Promise <APIResponse>
 */
export const productsRoute = (event: APIGatewayEvent) => {
    return new Promise(async (resolve) => {
        try {
            let inputData: RequestBody;
            let customerData: Customer;
            let availableProducts: Product[];
            let customerProducts: Product[];
            if (event.body) inputData = await parseJson(event.body);

            if (inputData) {
                // @ts-ignore
                const {customerId} = inputData;
                customerData = customerId && await getCustomerData(customerId);
                if (customerData) {
                    const availability = await getCustomerProductAvailability(customerId)
                        .catch(() => {
                            return undefined;
                        });
                    availableProducts = availability && availability.availableProducts;
                }
            }

            const serviceAData = await queryServiceA();

            const filtered = filterProducts(serviceAData.products, availableProducts, inputData);
            // @ts-ignore
            customerProducts = mapPrices(filtered, customerData, inputData);


            const body: ProductsBody = {
                products: customerProducts,
            };

            const response: APIResponse = {
                statusCode: StatusCodes.OK,
                body: JSON.stringify(body)
            };
            resolve(response);
        } catch (e) {
            console.warn("catched Products Request:", e.message);
            const err: APIResponse = {
                statusCode: StatusCodes.InternalServerError,
                body: JSON.stringify({error: "Internal Server Error occurred!"})
            }
            resolve(err);
        }
    });

    /**
     * @function filterProducts
     * @description Filter Products based on availability
     * @param products <Product[]>
     * @param availability <Product[]>
     * @param inputData <RequestBody>
     * @return Product[]
     */
    function filterProducts(products: Product[], availability: Product[], inputData: RequestBody) {
        if (!products) throw new Error("Missing Product Data!");
        return products.filter(product => {
            // @ts-ignore
            if (availability && availability.find(p => p.productCode = product.productCode)) return true;
            // @ts-ignore
            return product.generallyAvailable || inputData && inputData.isBusinessCustomer;
        })
    }

    /**
     * @function mapPrices
     * @description Maps Pricing corresponding to User Data
     * @param productData <Product[]>
     * @param customerData <Customer>
     * @param inputData <RequestBody>
     * @return Product[]
     */
    function mapPrices(productData: Product[], customerData: Customer, inputData: RequestBody) {
        if (!productData) throw new Error("Missing Product Data!");
        return Object.values(productData).map((product: Product) => {
            if (Array.isArray(product.prices)) {
                product.price = product.prices
                    // @ts-ignore
                    .find(p => p.isExistingCustomer && (customerData || inputData.isBusinessCustomer) || !p.isExistingCustomer)
            } else {
                product.price = product.prices;
            }
            delete product.prices;
            return product;
        })
    }


}


