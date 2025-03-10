import imageService from '../service/image.service.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedImage = await imageService.uploadImage(req);
    res.status(200).json({
      message: "Image uploaded successfully",
      data: uploadedImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
    try {  
      const result = await imageService.deleteImage(req);
      res.status(200).json({ message: "Image deleted successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export const createImage = async (req, res) => {
    try {
      const result = await imageService.createImage(req);
      res.status(200).json({ message: "Image created successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const avatarImage = async (req, res) => {
    try {
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }
    
        const uploadedImage = await imageService.avatarImage(req);
        res.status(200).json({
          message: "Avatar uploaded successfully",
          data: uploadedImage,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export const commentImage = async (req, res) => {
    try {  
      const result = await imageService.commentImage(req);
      res.status(200).json({ message: "Comment created successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const getDataImage = async (req, res) => {
    try {
      const result = await imageService.getDataImage(req);
      res.status(200).json({ message: "Get data successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const postDataImage = async (req, res) => {
    try {
      const result = await imageService.postDataImage(req);
      res.status(200).json({ message: "Get data successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const listComment = async (req, res) => {
    try {  
      const result = await imageService.listComment(req);
      res.status(200).json({ message: "Get data successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const testVPS = async (req, res) => {
    try {  
      const result = await imageService.testVPS(req);
      res.status(200).json({ message: "Get data successfully", data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}