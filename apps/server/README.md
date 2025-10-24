# Fireflies Server

## Environment Setup

Create a `.env` file in the server directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
```

## API Endpoints

### POST /api/recording/process

Processes an audio recording and returns transcription and summary.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: audio file (audio/*)

**Response:**
```json
{
  "transcript": "Full transcription text...",
  "summary": "Резюме того, о чём говорил человек в записи...",
  "actionItems": ["Действие 1", "Действие 2", "Действие 3"]
}
```

**AI Processing:**
- **Transcription:** OpenAI Whisper-1 для преобразования аудио в текст
- **Summary:** GPT-4o-mini создаёт резюме речи человека на том же языке, на котором говорил человек (не отвечает на вопросы, а суммирует сказанное)
- **Action Items:** GPT-4o-mini извлекает конкретные действия и задачи, упомянутые в речи

**CORS Configuration:**
- Origins: `http://localhost:4200`, `http://localhost:3000`
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization

## Running the Server

```bash
# Install dependencies
yarn install

# Start development server
yarn nx serve server

# Build for production
yarn nx build server
```
