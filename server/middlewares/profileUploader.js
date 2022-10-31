import uploader from '../utils/fileUpload.js';

function profileUpload(req, res, next) {
  const upload = uploader(
    ['image/jpeg', 'image/jpg', 'image/png'],
    1000000,
    'Only .jpg, jpeg or .png format allowed!'
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: err,
      });
    } else {
      next();
    }
  });
}

export default profileUpload;
