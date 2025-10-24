import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordingController } from './recording.controller';
import { AiService } from './ai.service';
import { FileUploadService } from './services/file-upload.service';
import { ErrorHandlerService } from './services/error-handler.service';

@Module({
  imports: [],
  controllers: [AppController, RecordingController],
  providers: [AppService, AiService, FileUploadService, ErrorHandlerService],
})
export class AppModule {}
