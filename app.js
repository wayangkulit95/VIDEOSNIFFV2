const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// URL of the webpage to scrape
const url = 'https://example.com'; // Replace with your target URL

async function collectVideoLinks() {
    try {
        // Fetch the webpage content
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Array to store video links
        const videoLinks = [];

        // Select video tags and src attributes from video sources
        $('video source').each((i, elem) => {
            const videoSrc = $(elem).attr('src');
            if (videoSrc) {
                videoLinks.push(videoSrc);
            }
        });

        // Select any links with video file extensions like .mp4, .mkv, .webm, .m3u8, .mpd, and .m3u
        $('a[href$=".mp4"], a[href$=".mkv"], a[href$=".webm"], a[href$=".m3u8"], a[href$=".mpd"], a[href$=".m3u"]').each((i, elem) => {
            const link = $(elem).attr('href');
            if (link) {
                videoLinks.push(link);
            }
        });

        // Save links to a JSON file
        fs.writeFileSync('videoLinks.json', JSON.stringify(videoLinks, null, 2));
        console.log('Video links have been collected and saved to videoLinks.json');
    } catch (error) {
        console.error('Error:', error);
    }
}

collectVideoLinks();
