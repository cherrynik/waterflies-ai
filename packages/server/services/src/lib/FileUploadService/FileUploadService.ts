import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ERROR_MESSAGES } from '@waterflies/constants/server';
import { FILE_UPLOAD_CONFIG } from './constants';

type MulterCallback = (error: Error | null, result: boolean) => void;
type FilenameCallback = (error: Error | null, filename: string) => void;

@Injectable()
export class FileUploadService {
  static getMulterConfig() {
    return {
      storage: diskStorage({
        destination: FILE_UPLOAD_CONFIG.uploadDirectory,
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
        const isValid = FILE_UPLOAD_CONFIG.allowedMimeTypes.some(
          (type: string) => file.mimetype.startsWith(type)
        );
        callback(
          isValid ? null : new Error(ERROR_MESSAGES.INVALID_FILE_TYPE),
          isValid
        );
      },
      limits: { fileSize: FILE_UPLOAD_CONFIG.maxFileSize },
    };
  }

  validateFile(file: Express.Multer.File): void {
    if (!file) throw new Error(ERROR_MESSAGES.NO_AUDIO_FILE);
  }
}
