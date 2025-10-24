import { Module } from '@nestjs/common';
import {
  AppController,
  RecordingController,
} from '@waterflies/server/controllers';
import {
  AppService,
  AiService,
  FileUploadService,
  ErrorHandlerService,
} from '@waterflies/server/services';

@Module({
  imports: [],
  controllers: [AppController, RecordingController],
  providers: [AppService, AiService, FileUploadService, ErrorHandlerService],
})
export class AppModule {}
