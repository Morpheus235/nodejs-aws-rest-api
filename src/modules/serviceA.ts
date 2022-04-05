import {parseFileAsJson} from "../lib/utils";
import * as path from "path";
import {FileContent} from "../types/database";

export const queryServiceA = async () => {
    return new Promise<any>((resolve, reject) => {
        const serviceAPath: string = path.resolve(__dirname, "../data/products-service-a.json");
        const serviceResult: FileContent | undefined = parseFileAsJson(serviceAPath);

        if (!serviceResult) reject("Service A is not available!");
        resolve(serviceResult);
    })
}