const shortid = require("shortid");
const { createWriteStream, mkdir } = require("fs");
let File = require("../../models/File");
const storeUpload = async({ stream, filename, mimetype, encoding }) => {
    const id = shortid.generate();
    const path = `images/${id}-${filename}`;
    let writing = createWriteStream(path, { encoding });

    return new Promise((resolve, reject) => {
        stream.pipe(writing);
        stream.on("close", () => resolve({ id, path, filename, mimetype }));
        stream.on("error", () => reject());
    });
};
const processUpload = async(upload) => {
    const { createReadStream, filename, mimetype } = await upload;
    console.log(upload);
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
};
module.exports = {
    Mutation: {
        uploadFile: async(_, { file }) => {
            mkdir("images", { recursive: true }, (err) => {
                if (err) throw err;
            });

            const upload = await processUpload(file);
            await File.create(upload);
            return upload;
        },
    },
};