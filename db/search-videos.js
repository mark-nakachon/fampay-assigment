const db = require("../config/dbConfig")

const searchVideos = async (query, pageSize, pageNumber) => {
    try {
        let builder = db
            .select('*')
            .from('videos');

        if (query != null && query !== '') {
            builder = builder.whereRaw(`title LIKE '%${query}%'`);
            builder = builder.orWhereRaw(`description LIKE '%${query}%'`);
        }

        builder = builder.limit(pageSize).offset((pageNumber - 1) * pageSize);

        return await builder;
    } catch (e) {
        throw e;
    }
}

module.exports = searchVideos;