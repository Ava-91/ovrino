import { HttpSpeechProvider } from '../server/providers/http-provider';
import { validateSpeechRequest } from '../server/validation';
import type { SpeechResponse } from '../server/types';

const providerEndpoint = process.env.TTS_PROVIDER_ENDPOINT;
const providerApiKey = process.env.TTS_PROVIDER_API_KEY;

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed.' });
  }

  if (!providerEndpoint || !providerApiKey) {
    return json(503, { error: 'Speech service is not configured.' });
  }

  try {
    const body = await request.json();
    const speechRequest = validateSpeechRequest(body);
    const provider = new HttpSpeechProvider(providerEndpoint, providerApiKey);
    const result: SpeechResponse = await provider.synthesize({
      ...speechRequest,
      settings: speechRequest.settings ?? {},
    });

    return json(200, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Speech generation failed.';
    const status = message.includes('required') || message.includes('characters') || message.includes('must be')
      ? 400
      : 502;

    return json(status, { error: message });
  }
}
