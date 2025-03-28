const axios = require('axios');

// Configuration and Constants
const REFERER_YOUTUBE = 'https://www.youtube.com/';
const USER_AGENT_ANDROID = 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36';

class ScoDerInnerTube {
  constructor(options = {}) {
    // Default to Android client
    this.baseUrl = 'https://youtubei.googleapis.com/youtubei/v1/';
    this.context = {
      clientName: 'ANDROID',
      clientVersion: '19.17.34',
      clientId: 3,
      apiKey: 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w',
      userAgent: USER_AGENT_ANDROID,
      referer: REFERER_YOUTUBE,
      ...options
    };

    this.session = axios.create({
      baseURL: this.baseUrl,
      headers: this.getHeaders()
    });
  }

  getHeaders() {
    return {
      'X-Goog-Api-Format-Version': '1',
      'X-YouTube-Client-Name': this.context.clientId.toString(),
      'X-YouTube-Client-Version': this.context.clientVersion,
      'User-Agent': this.context.userAgent || USER_AGENT_ANDROID,
      'Referer': this.context.referer || REFERER_YOUTUBE,
      'Content-Type': 'application/json'
    };
  }

  getContextPayload() {
    return {
      context: {
        client: {
          clientName: this.context.clientName,
          clientVersion: this.context.clientVersion
        }
      }
    };
  }

  async makeRequest(endpoint, payload) {
    try {
      const response = await this.session.post(endpoint, payload, {
        params: { key: this.context.apiKey }
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (axios.isAxiosError(error)) {
      return new Error(`YouTube API Error: ${error.response?.data?.error?.message || error.message}`);
    }
    return error;
  }

  async config() {
    const payload = this.getContextPayload();
    return this.makeRequest('config', payload);
  }

  async guide() {
    const payload = this.getContextPayload();
    return this.makeRequest('guide', payload);
  }

  async player(options) {
    const payload = {
      ...this.getContextPayload(),
      videoId: options.videoId
    };
    return this.makeRequest('player', payload);
  }

  async browse(options = {}) {
    const payload = {
      ...this.getContextPayload(),
      browseId: options.browseId,
      params: options.params,
      continuation: options.continuation
    };
    return this.makeRequest('browse', payload);
  }

  async search(options = {}) {
    const payload = {
      ...this.getContextPayload(),
      query: options.query || '',
      params: options.params,
      continuation: options.continuation
    };
    return this.makeRequest('search', payload);
  }

  async next(options = {}) {
    const payload = {
      ...this.getContextPayload(),
      params: options.params,
      playlistId: options.playlistId,
      videoId: options.videoId,
      playlistIndex: options.index,
      continuation: options.continuation
    };
    return this.makeRequest('next', payload);
  }

  async getTranscript(options) {
    const payload = {
      ...this.getContextPayload(),
      params: options.params
    };
    return this.makeRequest('get_transcript', payload);
  }

  async musicGetSearchSuggestions(options = {}) {
    const payload = {
      ...this.getContextPayload(),
      input: options.input || ''
    };
    return this.makeRequest('music/get_search_suggestions', payload);
  }

  async musicGetQueue(options = {}) {
    const payload = {
      ...this.getContextPayload(),
      playlistId: options.playlistId,
      videoIds: options.videoIds || []
    };
    return this.makeRequest('music/get_queue', payload);
  }
}

module.exports = ScoDerInnerTube;

// Example usage
async function example() {
  const yt = new ScoDerInnerTube();
  try {
    // Player example
    const playerInfo = await yt.player({ videoId: 'dQw4w9WgXcQ' });
    console.log('Player Info:', playerInfo);

    // Search example
    const searchResults = await yt.search({ query: 'JavaScript tutorials' });
    console.log('Search Results:', searchResults);

    // Browse example
    const browseResults = await yt.browse({ browseId: 'FEwhat_to_watch' });
    console.log('Browse Results:', browseResults);
  } catch (error) {
    console.error(error);
  }
}