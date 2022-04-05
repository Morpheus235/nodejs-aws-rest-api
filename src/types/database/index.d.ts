export type Customer = {
    "customerId": string,
    "gender": string,
    "givenName": string,
    "surName": string,
    "birthDate": string,
    "isBusinessCustomer": boolean
}

export type CustomerId = string;

export type FilePath = string;

export type FileContent = any;


export type Availability = {
    availableProducts: [Product]
}


export type Product = {
    productCode: string,
    "productCategoryCode"?: string,
    "productName"?: string,
    "generallyAvailable"?: boolean,
    "prices"?: [Price] | Price
    price?: Price
}

export type Price = {
    "isExistingCustomer": boolean,
    "netPrice": string,
    "bruttoPrice": string
    "bonusPercentage": number
}