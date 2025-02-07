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
      const { public_id } = req.body;
  
      if (!public_id) {
        return res.status(400).json({ error: "Missing public_id" });
      }
  
      const result = await imageService.deleteImage(public_id);
  
      if (result.result !== "ok") {
        return res.status(400).json({ error: "Failed to delete image" });
      }
  
      res.status(200).json({ message: "Image deleted successfully" });
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