import {FileContent, FilePath} from "../types/database";
import * as fs from "fs";
import * as path from "path";

const fsP = fs.promises;
/**
 * @function parseFileasJson
 * @description checks if local File does exist and tries to parse it as JSON
 * @param filePath
 * @return Promise <File>
 */
export const parseFileAsJson = async (filePath: FilePath) => {
    return new Promise<FileContent | void>(async (resolve, reject) => {
        if (!filePath) reject("Missing Filepath!");
        const resolvedPath = path.resolve(__dirname, "../data", filePath);
        let fileExists = true;
        await fsP.access(resolvedPath, fs.constants.R_OK)
            .catch(() => fileExists = false);
        if (!fileExists) return reject("Database not available!");

        const fileContent = await fsP.readFile(resolvedPath)
            .catch(() => reject("Database not available!"));


        if (!fileContent) reject("File does not exist!");
        // @ts-ignore
        const parsedFile = fileContent && await parseJson(fileContent.toString()) || undefined;
        resolve(parsedFile);
    });
}

/**
 * @function parseJson
 * @description Tries to parse given String as JSON
 * @param data
 * @return Promise<object>
 */
export const parseJson = (data: string) => {
    return new Promise<object>((resolve, reject) => {
        if (!data) reject("Missing Data!");
        try {

            resolve(JSON.parse(data));
        } catch (e) {
            resolve(undefined);
        }
    })
}