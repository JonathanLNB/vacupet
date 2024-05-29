import {UploadedFile} from 'express-fileupload';
import {Request} from "express";
import {FileUploaderType} from "../Enums/FileUploaderType";
import {Paths} from "../Enums/Paths";
import fs = require('fs');

export abstract class FileManager {
    public static DeleteFile(filePath: string) {
        fs.unlink(filePath, err => {
            if (err) {
                if (err.code == 'ENOENT') {
                    return;
                }
                throw err;
            }
            return;
        });
    }

    public static async UploadFile(identifier: string, req: Request, uploaderType: FileUploaderType): Promise<string[]> {
        let uploadeFiles: string[];
        if (!req.files || Object.keys(req.files).length === 0)
            return [];
        const folderPath = this.GetUploaderFolderPath(uploaderType);
        const imagesFromRequest = this.GetFilesFromRequest(req, uploaderType);
        uploadeFiles = await this.ProcessFiles(identifier, imagesFromRequest, folderPath, this.GetUploaderFilePathName(uploaderType));
        return uploadeFiles;
    }

    public static async ProcessFiles(identifier: string, files: any, folderPath: string, filePathName: string): Promise<string[]> {
        let uploadeFiles: string[] = [];
        try {
            let imageToProcess: UploadedFile;
            let uniqueFileName: string;
            let filePath: string;
            let uploadPath: string;
            let imagesToProcess = !files.length ? [files] : files;
            for (let i = 0; i < imagesToProcess.length; i++) {
                imageToProcess = imagesToProcess[i] as UploadedFile;
                uniqueFileName = `${Date.now()}_${Math.round(Math.random() * 1E9)}_${identifier}.pdf`;
                filePath = folderPath + uniqueFileName;
                uploadPath = process.cwd() + filePath;
                await new Promise(resolve => {
                    if (!fs.existsSync(process.cwd() + folderPath)) {
                        fs.mkdirSync(process.cwd() + folderPath);
                    }
                    imageToProcess.mv(uploadPath, (err) => {
                        if (err) {
                            console.log("Error", err)
                            resolve(false);
                        }
                        if (!err)
                            uploadeFiles.push(filePathName + uniqueFileName);
                        resolve(true);
                    });
                });
            }
        } catch (e) {
            console.log("Error catch", e);
        }
        return uploadeFiles;
    }

    private static GetFilesFromRequest(req: Request, uploaderType: FileUploaderType): UploadedFile | UploadedFile[] {
        switch (uploaderType) {
            case FileUploaderType.Checklist:
                return req.files.checklist;
            default:
                return req.files.files;
        }
    }

    private static GetUploaderFolderPath(uploaderType: FileUploaderType): string {
        switch (uploaderType) {
            case FileUploaderType.Checklist:
                return Paths.FilePath;
            default:
                return Paths.DefaultPath;
        }
    }

    private static GetUploaderFilePathName(uploaderType: FileUploaderType): string {
        switch (uploaderType) {
            case FileUploaderType.Checklist:
                return Paths.FileServicePath;
            default:
                return Paths.DefaultServicePath;
        }
    }
}
