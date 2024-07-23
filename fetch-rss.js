<div id="rss-feed" style="width: 100%; text-align: center;"></div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch RSS feed for a given channel
    async function fetchRSS(channelId) {
      try {
        console.log(`Fetching RSS feed for channel ID: ${channelId}...`);
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`));
        const data = await response.json();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'application/xml');
        const items = xml.querySelectorAll('entry');
        let html = '<div style="display: flex; flex-wrap: wrap; justify-content: center;">';
        items.forEach(item => {
          const titleElement = item.querySelector('title');
          const videoIdElement = item.querySelector('yt\\:videoId') || item.querySelector('videoId');
          if (titleElement && videoIdElement) {
            const title = titleElement.textContent;
            const videoId = videoIdElement.textContent;
            const link = `https://www.youtube.com/watch?v=${videoId}`;
            html += `
              <div style="margin: 10px; text-align: center;">
                <iframe width="300" height="169" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                <p><a href="${link}" target="_blank">${title}</a></p>
              </div>`;
          }
        });
        html += '</div>';
        document.getElementById('rss-feed').innerHTML = html;
        console.log("HTML updated successfully.");
      } catch (error) {
        console.error("Error fetching or parsing RSS feed:", error);
        document.getElementById('rss-feed').innerText = "Failed to load RSS feed.";
      }
    }

    // Check if we are on a specific thread and fetch RSS accordingly
    const currentUrl = window.location.href;

    if (currentUrl === 'https://haltesting.proboards.com/thread/1/welcome-new-forum') {
      // Fetch videos for the first channel
      fetchRSS('UC-widOciShnJDhNEF23T06w');
    } else if (currentUrl === 'https://haltesting.proboards.com/thread/2/another-thread') {
      // Fetch videos for the second channel
      fetchRSS('UCtQycmSrKdJ0zE0bWumO4vA');
    }
  });
</script>
