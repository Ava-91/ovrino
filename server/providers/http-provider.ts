import type { ProviderSpeechRequest, SpeechProvider, SpeechResponse } from '../types';

/**
 * Adapter for providers that expose a JSON HTTP speech endpoint.
 * Provider-specific authentication stays on the server.
 */
export class HttpSpeechProvider implements SpeechProvider {
  readonly name = 'http';

  constructor(
    private readonly endpoint: string,
    private readonly apiKey: string,
  ) {}

  async synthesize(request: ProviderSpeechRequest): Promise<SpeechResponse> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Speech provider returned ${response.status}.`);
    }

    const data = await response.json() as { audioUrl?: string };

    if (!data.audioUrl) {
      throw new Error('Speech provider returned no audio URL.');
    }

    return {
      audioUrl: data.audioUrl,
      provider: this.name,
      voiceId: request.voiceId,
    };
  }
}
