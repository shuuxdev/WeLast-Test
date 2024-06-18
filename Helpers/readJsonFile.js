const fs = require('fs');
const readJsonFile = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            try {
                const json = JSON.parse(data);
                resolve(json);
            } catch (parseError) {
                reject(parseError);
            }
        });
    });
};
module.exports = {
    readJsonFile
}