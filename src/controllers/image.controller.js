import {uploadMiddleware} from "../middlewares/uploadImage";

export const upload = async (req, res) => {
    try {
      await uploadMiddleware(req, res);
  
      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }
  
      res.status(200).json(req.file);
    } catch (err) {
      res.status(500).send({
        message: 'Could not upload the file',
      });
    }
  };