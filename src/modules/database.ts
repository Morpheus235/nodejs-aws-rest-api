import {Customer, CustomerId, Availability} from "../types/database";
import {parseFileAsJson} from "../lib/utils";


/**
 * @function getCustomerProductAvailability
 * @description Queries Customer Products availability
 * @param customerId <CustomerId>
 * @return Promise<{Availability} | {}>
 */
export const getCustomerProductAvailability = async (customerId: CustomerId) => {
    return new Promise<{ CustomerProducts } | {}>(async (resolve, reject) => {
        if (!customerId) reject("Missing Customer Id!");
        const customerPath = `product-availability-for-customer-${customerId}.json`;

        const customerProducts: Availability = await _queryDatabase(customerPath)
            .catch(() => reject("Database not available"));
        resolve(customerProducts || undefined);
    })
}

/**
 * @function getCustomerData
 * @description Query Data for given Customer Id
 * @param customerId
 * @return Promise <Customer | undefined>
 */
export const getCustomerData = async (customerId: CustomerId) => {
    return new Promise<Customer>(async (resolve, reject) => {
        if (!customerId) reject("Missing Customer Id!");

        const customers = await getCustomersData()
            .catch((err) => reject(err.message));
        if (!customers || !Array.isArray(customers)) reject("Failed to get Customers Data!");
        // @ts-ignore
        const customer = customers.find((c) => c.customerId === customerId);
        resolve(customer || undefined);
    })

}

/**
 * @function getCustomersData
 * @description Queries "Database" for Customers Data
 * @return Promise<[Customer] | []>
 */
export const getCustomersData = async () => {
    return new Promise<[Customer] | []>(async (resolve, reject) => {
        const databasePath = "customers-database.json";
        const customers: [Customer] = await _queryDatabase(databasePath)
            .catch((err) => reject(err.message));
        resolve(customers || []);
    })
};

const _queryDatabase = async (filePath) => parseFileAsJson(filePath);

