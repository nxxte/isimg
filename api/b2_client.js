const B2 = require('backblaze-b2');
const crypto = require('crypto');

const b2 = new B2({
    applicationKeyId: process.env.B2_KEY_ID,
    applicationKey: process.env.B2_APP_KEY,
});

const bucketName = process.env.B2_BUCKET_NAME;
const publicUrlPrefix = process.env.B2_PUBLIC_URL;

let authorized = false;
let bucketId = null;

async function ensureReady() {
    if (!authorized) {
        await b2.authorize();
        authorized = true;
    }
    if (!bucketId) {
        const { data } = await b2.getBucket({ bucketName });
        bucketId = data.buckets[0].bucketId;
    }
}

async function uploadToB2(buffer, filename, contentType) {
    await ensureReady();

    const key = `${crypto.randomUUID()}-${filename}`;
    const { data: uploadUrlData } = await b2.getUploadUrl({ bucketId });

    const { data } = await b2.uploadFile({
        uploadUrl: uploadUrlData.uploadUrl,
        uploadAuthToken: uploadUrlData.authorizationToken,
        fileName: key,
        data: buffer,
        contentType: contentType || 'b2/x-auto',
    });

    return {
        fileId: data.fileId,
        key,
        url: `${publicUrlPrefix}/${key}`,
    };
}

async function deleteFromB2(fileId, fileName) {
    await ensureReady();
    await b2.deleteFileVersion({ fileId, fileName });
}

module.exports = { uploadToB2, deleteFromB2 };
