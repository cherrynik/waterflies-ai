import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { appConfig } from '../config/app.config';
import { ERROR_MESSAGES } from '../constants/app.constants';

type MulterCallback = (error: Error | null, result: boolean) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

@Injectable()
export class FileUploadService {
  static getMulterConfig() {
    return {
      storage: diskStorage({
        destination: appConfig.fileUpload.uploadDirectory,
        filename: (
          _: unknown,
          file: Express.Multer.File,
          callback: FilenameCallback
        ) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `audio-${uniqueSuffix}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
      fileFilter: (
        _: unknown,
        file: Express.Multer.File,
        callback: MulterCallback
      ) => {
        const isValid = appConfig.fileUpload.allowedMimeTypes.some((type) =>
          file.mimetype.startsWith(type)
        );
        callback(
          isValid ? null : new Error(ERROR_MESSAGES.INVALID_FILE_TYPE),
          isValid
        );
      },
      limits: { fileSize: appConfig.fileUpload.maxFileSize },
    };
  }

  validateFile(file: Express.Multer.File): void {
    if (!file) throw new Error(ERROR_MESSAGES.NO_AUDIO_FILE);
  }
}
