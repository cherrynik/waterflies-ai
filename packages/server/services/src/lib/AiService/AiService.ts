import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ErrorHandlerService } from '../ErrorHandlerService/ErrorHandlerService';
import { isEmpty } from 'lodash';
import { OPENAI_MODELS, AI_PROMPTS, OPENAI_API_KEY } from './constants';
import type { ProcessingResponse } from './types';

@Injectable()
export class AiService {
  private readonly openai: OpenAI;

  constructor(private readonly errorHandler: ErrorHandlerService) {
    this.openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  }

  async processAudio(audioFilePath: string): Promise<ProcessingResponse> {
    try {
      const transcript = await this.transcribeAudio(audioFilePath);

      const summary = await this.generateSummary(transcript);

      const actionItems = await this.extractActionItems(transcript);

      return {
        transcript,
        summary,
        actionItems,
      };
    } catch (error) {
      this.errorHandler.handleAiProcessingError(error);
    }
  }

  private async transcribeAudio(audioFilePath: string): Promise<string> {
    try {
      const transcript = await this.openai.audio.transcriptions.create({
        file: require('fs').createReadStream(audioFilePath),
        model: OPENAI_MODELS.WHISPER,
      });
      return transcript.text;
    } catch (error) {
      this.errorHandler.handleTranscriptionError(error);
    }
  }

  private async generateSummary(transcript: string): Promise<string> {
    try {
      const summary = await this.openai.chat.completions.create({
        model: OPENAI_MODELS.GPT_4O_MINI,
        messages: [
          { role: 'system', content: AI_PROMPTS.SUMMARY },
          { role: 'user', content: transcript },
        ],
      });
      return summary.choices[0].message.content || '';
    } catch (error) {
      this.errorHandler.handleSummaryGenerationError(error);
    }
  }

  private async extractActionItems(transcript: string): Promise<string[]> {
    try {
      const actionItems = await this.openai.chat.completions.create({
        model: OPENAI_MODELS.GPT_4O_MINI,
        response_format: {
          type: 'json_schema',
          json_schema: {
            name: 'action_items',
            schema: {
              type: 'object',
              properties: {
                items: {
                  type: 'array',
                  items: { type: 'string' },
                  description:
                    'List of extracted action items from the transcript',
                },
              },
              additionalProperties: false,
              required: ['items'],
            },
          },
        },
        messages: [
          { role: 'system', content: AI_PROMPTS.ACTION_ITEMS },
          { role: 'user', content: transcript },
        ],
      });
      const parsedActionItems = this.parseActionItemsResponse(actionItems);
      return parsedActionItems;
    } catch (error) {
      this.errorHandler.handleActionItemsExtractionError(error);
    }
  }

  private parseActionItemsResponse(
    actionItems: OpenAI.Chat.Completions.ChatCompletion
  ): string[] {
    try {
      const content = actionItems.choices[0].message.content;
      if (!isEmpty(content)) {
        return JSON.parse(content!);
      }
      return [];
    } catch (error) {
      console.warn('Failed to parse action items:', error);
      return [];
    }
  }
}
