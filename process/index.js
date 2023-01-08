const { google } = require("googleapis");
const youtube = google.youtube("v3");

// These are keywords for entertainment
const keywords = "entertainment"|"fun"|"celebration"|"laughs"|"party"|"event"|"music"|"gaming";

const insertVideo = require("../db/insert-video");

let lastSuccessfulApiKey = process.env.YOUTUBE_API_KEY;

const insertLatestVideos = async (fallbackKey) => {
        try {
            const timestamp = new Date();
            timestamp.setSeconds(timestamp.getSeconds() - 15);
            console.log("Fetching videos Published after: ", timestamp.toISOString());
            const res = await youtube.search.list({
                key: lastSuccessfulApiKey,
                part: [
                    "snippet"
                ],
                maxResults: 50,
                order: "date",
                publishedAfter: timestamp.toISOString(),
                q: keywords,
                type: [
                    "video"
                ],
                fields: "items(id, snippet(publishedAt,title,description,thumbnails))",
            });

            const { items } = res.data;

            if (items.length === 0) {
                console.log("No Videos Found...");
            }

            for (const item of items) {
                const { videoId } = item.id;
                const { title, description, publishedAt, thumbnails } = item.snippet;
                const thumbnail = thumbnails["high"].url || thumbnails["default"].url;
                await insertVideo(videoId, title, description, thumbnail, publishedAt);
            }
        }
        catch (e) {
            const { code, errors } = e.response.data.error;
            if (code === 403) {
                if (errors[0].reason === "quotaExceeded") {
                    if (fallbackKey) {
                        console.log("Fallback Key also expired");
                        return;
                    }
                    console.log("Quota Exceeded, using fallback api key");
                    lastSuccessfulApiKey = process.env.YOUTUBE_API_KEY_FALLBACK;
                    await insertLatestVideos(true);
                }
            }
        }
}

module.exports = {
    insertLatestVideos,
};