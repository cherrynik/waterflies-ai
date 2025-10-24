import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import {
  AiService,
  FileUploadService,
  ErrorHandlerService,
  type ProcessingResponse,
} from '@waterflies/server/services';
import { FILE_UPLOAD_CONFIG } from '@waterflies/server/services';

@Controller('recording')
export class RecordingController {
  constructor(
    private readonly aiService: AiService,
    private readonly fileUploadService: FileUploadService,
    private readonly errorHandler: ErrorHandlerService
  ) {}

  @Post('process')
  @UseInterceptors(
    FileInterceptor('audio', FileUploadService.getMulterConfig())
  )
  async processRecording(
    @UploadedFile() file: Express.Multer.File
  ): Promise<ProcessingResponse> {
    this.fileUploadService.validateFile(file);

    try {
      // Create uploads directory if it doesn't exist
      if (!fs.existsSync(FILE_UPLOAD_CONFIG.uploadDirectory)) {
        fs.mkdirSync(FILE_UPLOAD_CONFIG.uploadDirectory, {
          recursive: true,
        });
      }

      // Process audio using AI service
      const result = await this.aiService.processAudio(file.path);

      // Clean up the uploaded file
      fs.unlinkSync(file.path);

      return result;
    } catch (error) {
      // Clean up the uploaded file in case of error
      if (file && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      this.errorHandler.handleFileUploadError(error);
    }
  }
}
