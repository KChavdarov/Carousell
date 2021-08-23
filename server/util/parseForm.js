const formidable = require('formidable');

function parseForm(req) {
    const form = formidable({ multiples: true });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                for (const [k, v] of Object.entries(fields)) {
                    fields[k] = JSON.parse(v);
                }
                let images = Object.values(files);
                resolve([fields, images]);
            }
        });
    });
}

module.exports = {
    parseForm
};