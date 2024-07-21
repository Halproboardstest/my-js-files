async function fetchRSS() {
  try {
    console.log("Fetching RSS feed...");
    const response = await fetch('https://api.codetabs.com/v1/proxy/?quest=' + encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UC-widOciShnJDhNEF23T06w'));
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const text = await response.text();
    console.log("Raw XML text:", text);

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    console.log("Parsed XML:", xml);

    const items = xml.querySelectorAll('entry');
    if (items.length === 0) throw new Error("No items found in RSS feed.");

    let html = '<div style="display: flex; flex-wrap: wrap; justify-content: center;">';
    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent || `No title for item ${index}`;
      const videoIdElement = item.querySelector('yt\\:videoId');
      const videoId = videoIdElement ? videoIdElement.textContent : null;

      if (!videoId) {
        console.error(`No videoId for item ${index}`, item);
        return;
      }

      const link = `https://www.youtube.com/watch?v=${videoId}`;
      html += `
        <div style="margin: 10px; text-align: center;">
          <iframe width="300" height="169" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
          <p>${title}</p>
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

document.addEventListener('DOMContentLoaded', fetchRSS);
