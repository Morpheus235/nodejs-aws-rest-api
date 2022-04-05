<!--
title: 'AWS Simple HTTP Endpoint in Typescript'
description: 'This is a small sample application for using Serverless + Typescript'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Daniel Soßnowski'
authorAvatar: 'https://avatars.githubusercontent.com/u/40322103?v=4'
-->

# Serverless Framework Node REST API on AWS using Typescript

This is a small sample Application for a Products Rest Application.
As this is just a scratch Application it is not meant for Production!

## Usage

### Deployment

This Application works using the Serverless Framework.
For online Deployment you have to provide AWS Credentials first.
There is a template File in the Root Folder of this Repository for providing these in a .env File

```bash
npm i
serverless login
serverless deploy
```

### Invocation

After successful deployment, you can call the created application via HTTP:

```bash
curl https://xxxxxxx.execute-api.eu-central-1.amazonaws.com/dev/products
```

Sample Response:

```json
{
  "products": [
    {
      "productCode": "VAC-0005",
      "productCategoryCode": "",
      "productName": "Vacuum cleaner V300, Siemens",
      "generallyAvailable": true,
      "price": {
        "isExistingCustomer": false,
        "netPrice": "126,00 €",
        "bruttoPrice": "149,00 €",
        "bonusPercentage": 0
      }
    },
    {
      "productCode": "HAD-0064",
      "productCategoryCode": "HAD",
      "productName": "Hair dryer Grundig Z22 Sharp XION",
      "generallyAvailable": true,
      "price": {
        "isExistingCustomer": false,
        "netPrice": "49,58 €",
        "bruttoPrice": "59,00 €",
        "bonusPercentage": 0
      }
    }
  ]
}
```

### Local development

The application can be deployed locally using:

```bash
serverless offline
```





### Credits
This Application is based on the AWS Node.js HTTP Endpoint example and the Serverless Documentation

Sources: 
- [Node.js Example](https://github.com/serverless/examples/tree/master/aws-node-simple-http-endpoint)
- [Serverless Documentation](https://www.serverless.com/framework/docs/)


### License
This project is licensed under the terms of the MIT license.
