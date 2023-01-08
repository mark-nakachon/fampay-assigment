const db = require("../config/dbConfig")

const insertVideo = async (videoId, title, description, thumbnail, publishedAt) => {
    try {
        await db('videos').insert([
            {
                "video_id": videoId,
                "title": title,
                "description": description,
                "thumbnail_url": thumbnail,
                "published_at": publishedAt
        }
        ])
        console.log("Inserted Video Id:"+ videoId)
    } catch (e) {
        throw e;
    }
}

module.exports = insertVideo;