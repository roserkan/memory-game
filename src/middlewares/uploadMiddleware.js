const multer = require('multer')

function uploadMiddleware(path) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path)
        },
        filename: function (req, file, cb) {

            cb(null, Date.now() + file.originalname)
        }
    })
    const fileFilter = (req, file, cb) => {
        cb(null, true)
    }

    return multer({ storage: storage, fileFilter: fileFilter })
}



module.exports = uploadMiddleware;