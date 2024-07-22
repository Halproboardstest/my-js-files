<div id="rss-feed" style="width: 100%; text-align: center;"></div>

<script>
  async function fetchRSS() {
    try {
      console.log("Fetching RSS feed...");
      const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UC-widOciShnJDhNEF23T06w'));
      const data = await response.json();
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, 'application/xml');
      const items = xml.querySelectorAll('entry');
      let html = '<div style="display: flex; flex-wrap: wrap; justify-content: center;">';
      items.forEach(item => {
        const title = item.querySelector('title').textContent;
        const videoId = item.querySelector('yt\\:videoId').textContent;
        const link = `https://www.youtube.com/watch?v=${videoId}`;
        html += `
          <div style="margin: 10px; text-align: center;">
            <iframe width="300" height="169" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            <p><a href="${link}" target="_blank">${title}</a></p>
          </div>`;
      });
      html += '</div>';
      document.getElementById('rss-feed').innerHTML = html;
      console.log("HTML updated successfully.");
    } catch (error) {
      console.error("Error fetching or parsing RSS feed:", error);
      document.getElementById('rss-feed').innerText = "Failed to load RSS feed.";
    }
  }
  fetchRSS();
</script>
