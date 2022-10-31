// external imports
import multer from 'multer';
import path from 'path';
import ErrorResponse from './error.js';

function uploader(allowed_file_types, max_file_size, error_msg) {
  // File upload folder
  const UPLOADS_FOLDER = `${path.__dirname}/../public/uploads/`;

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, '')
          .toLowerCase()
          .split(' ')
          .join('-') +
        '-' +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // preapre the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new ErrorResponse(error_msg, 400));
      }
    },
  });

  return upload;
}

export default uploader;
