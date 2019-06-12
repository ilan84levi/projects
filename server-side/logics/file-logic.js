const models = require("../models");
const Img = models.Img;

function uploadImage(image) {
    
    let encode_image = image.toString('base64');
    let finalImg = {
        contentType: req.file.mimetype,
        image:  new Buffer.from(encode_image, 'base64')
     };
     
    return new Promise((resolve, reject) => {
        const imageAdded = new Img(image);
        imageAdded.save(finalImg ,(err, info) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
       
    });
}

module.exports = {
    uploadImage
};