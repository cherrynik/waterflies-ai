import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/app.constants';

@Injectable()
export class ErrorHandlerService {
  private createError(message: string, error: unknown): string {
    return error instanceof Error
      ? `${message}: ${error.message}`
      : `${message}: ${ERROR_MESSAGES.UNKNOWN_ERROR}`;
  }

  handleFileUploadError(error: unknown): never {
    throw new BadRequestException(
      this.createError(ERROR_MESSAGES.PROCESSING_FAILED, error)
    );
  }

  handleAiProcessingError(error: unknown): never {
    throw new InternalServerErrorException(
      this.createError(ERROR_MESSAGES.AI_PROCESSING_FAILED, error)
    );
  }

  handleValidationError(message: string): never {
    throw new BadRequestException(message);
  }

  handleTranscriptionError(error: unknown): never {
    throw new InternalServerErrorException(
      this.createError(ERROR_MESSAGES.TRANSCRIPTION_FAILED, error)
    );
  }

  handleSummaryGenerationError(error: unknown): never {
    throw new InternalServerErrorException(
      this.createError(ERROR_MESSAGES.SUMMARY_GENERATION_FAILED, error)
    );
  }

  handleActionItemsExtractionError(error: unknown): never {
    throw new InternalServerErrorException(
      this.createError(ERROR_MESSAGES.ACTION_ITEMS_EXTRACTION_FAILED, error)
    );
  }
}
