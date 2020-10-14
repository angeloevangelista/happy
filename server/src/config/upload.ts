import path from 'path';
import multer, { Options as IMulterOptions } from 'multer';

const multerConfig: IMulterOptions = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const filename = `${Date.now()}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};

export default multerConfig;
