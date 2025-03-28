# SoCoder InnerTube

A lightweight library to interact with YouTube API using InnerTube.

## Installation

```bash
npm install socoder-innertube
```

## Usage

```javascript
const ScoDerInnerTube = require('socoder-innertube');

async function example() {
  const yt = new ScoDerInnerTube();

  try {
    // Get video player information
    const playerInfo = await yt.player({ videoId: 'dQw4w9WgXcQ' });
    
    // Search videos
    const searchResults = await yt.search({ query: 'JavaScript tutorials' });
    
    // Browse recommendations
    const browseResults = await yt.browse({ browseId: 'FEwhat_to_watch' });
  } catch (error) {
    console.error(error);
  }
}
```

## Methods

- `player(options)`: Fetch video player information
- `search(options)`: Search YouTube videos
- `browse(options)`: Get recommendations
- `next(options)`: Fetch related content

## License

MIT