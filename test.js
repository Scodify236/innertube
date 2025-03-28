const ScoDerInnerTube = require('./src/index.js');
const util = require('util');

// Helper function for pretty printing large objects
function prettyPrint(obj) {
  return util.inspect(obj, { 
    depth: 4, 
    colors: true, 
    maxArrayLength: 10 // Limit array output to prevent overwhelming logs
  });
}

async function runTests() {
  const yt = new ScoDerInnerTube();

  console.log('Running YouTube InnerTube API Tests...');

  // Test 1: Player Information
  try {
    console.log('\n[TEST 1] Fetching Player Information');
    const playerInfo = await yt.player({ videoId: 'dQw4w9WgXcQ' });
    
    if (!playerInfo) {
      throw new Error('No player information received');
    }
    
    console.log('✅ Player Info Fetched Successfully');
    console.log('Full Player Response:');
    console.log(prettyPrint(playerInfo));
    
    // Optional: Log some specific details
    console.log('Video Title:', playerInfo.videoDetails?.title || 'N/A');
  } catch (error) {
    console.error('❌ Player Information Test Failed:', error.message);
  }

  // Test 2: Search Functionality
  try {
    console.log('\n[TEST 2] Performing Search');
    const searchResults = await yt.search({ query: 'JavaScript tutorials' });
    
    if (!searchResults) {
      throw new Error('No search results received');
    }
    
    console.log('✅ Search Completed Successfully');
    console.log('Full Search Response:');
    console.log(prettyPrint(searchResults));
    
    console.log('Number of Results:', searchResults.contents?.length || 0);
  } catch (error) {
    console.error('❌ Search Test Failed:', error.message);
  }

  // Test 3: Browse Functionality
  try {
    console.log('\n[TEST 3] Browse Recommendations');
    const browseResults = await yt.browse({ browseId: 'FEwhat_to_watch' });
    
    if (!browseResults) {
      throw new Error('No browse results received');
    }
    
    console.log('✅ Browse Recommendations Fetched');
    console.log('Full Browse Response:');
    console.log(prettyPrint(browseResults));
  } catch (error) {
    console.error('❌ Browse Test Failed:', error.message);
  }

  // Test 4: Next/Related Content
  try {
    console.log('\n[TEST 4] Fetching Related Content');
    const relatedContent = await yt.next({ videoId: 'dQw4w9WgXcQ' });
    
    if (!relatedContent) {
      throw new Error('No related content received');
    }
    
    console.log('✅ Related Content Fetched Successfully');
    console.log('Full Related Content Response:');
    console.log(prettyPrint(relatedContent));
  } catch (error) {
    console.error('❌ Related Content Test Failed:', error.message);
  }

  console.log('\n🏁 All Tests Completed');
}

// Run the tests
runTests().catch(error => {
  console.error('Unhandled Error in Test Suite:', error);
});