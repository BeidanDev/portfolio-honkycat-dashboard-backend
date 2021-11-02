const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (files, validExtensions = ['png', 'jpg', 'jpeg'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameCutOff = file.name.split('.');
        const extension = nameCutOff[nameCutOff.length - 1];

        // Validate the extension
        if(!validExtensions.includes(extension)) {
            return reject(`La extension ${ extension } no es permitida - ${ validExtensions }`);
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

        file.mv(uploadPath, (err) => {
            if(err) {
                reject(err);
            }

            resolve(nameTemp);
        })
    });
}

module.exports = {
    uploadFile
}