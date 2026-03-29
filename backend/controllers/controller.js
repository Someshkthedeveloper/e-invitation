import Invitation from "../models/invitation.js";

// Create Invitation
export const createInvitation = async (req, res) => {
  try {
    const { slug, ...rest } = req.body;

    const invitation = await Invitation.create({
      ...rest,
      slug,
      user: req.user,
    });

    res.status(201).json({
      message: "Invitation created",
      link: `${process.env.BASE_URL}/invitation/${slug}`,
      data: invitation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Invitation by slug
export const getInvitation = async (req, res) => {
  try {
    const { slug } = req.params;

    const invitation = await Invitation.findOne({ slug });

    if (!invitation) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(invitation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all invitations for logged-in user
export const getUserInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({ user: req.user })
      .sort({ createdAt: -1 });
    res.json(invitations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update invitation by slug
export const updateInvitation = async (req, res) => {
  try {
    const inv = await Invitation.findOneAndUpdate(
      { slug: req.params.slug, user: req.user },
      req.body,
      { returnDocument: 'after' }
    );
    if (!inv) return res.status(404).json({ error: "Not found" });
    res.json(inv);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const uploadImage = async (req, res) => {
    try {
      const { slug } = req.params;
      const { key } = req.body;
  
      const allowedKeys = ["bridePhoto", "groomPhoto"];
      if (!allowedKeys.includes(key)) {
        return res.status(400).json({ error: "Invalid key" });
      }
  
      if (!req.file) {
        return res.status(400).json({ error: "File missing" });
      }
  
      const mime = req.file.mimetype;
      const base64 = req.file.buffer.toString("base64");
      const dataUrl = `data:${mime};base64,${base64}`;
  
      const invitation = await Invitation.findOneAndUpdate(
        { slug },
        { $set: { [key]: dataUrl } },
        { returnDocument: 'after' }
      );
  
      if (!invitation) {
        return res.status(404).json({ error: "Invitation not found" });
      }
  
      res.json({ key, base64: dataUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  export const uploadGalleryPhoto = async (req, res) => {
    try {
      const { slug } = req.params;
      const { caption } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ error: "Photo missing" });
      }
  
      const mime = req.file.mimetype;
      const base64 = req.file.buffer.toString("base64");
      const dataUrl = `data:${mime};base64,${base64}`;
  
      const newPhoto = {
        id: `photo-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        base64: dataUrl,
        caption: caption || "",
      };
  
      const updated = await Invitation.findOneAndUpdate(
        { slug },
        { $push: { gallery: newPhoto } },
        { returnDocument: 'after' }
      );
  
      if (!updated) {
        return res.status(404).json({ error: "Invitation not found" });
      }
  
      res.json({
        photo: newPhoto,
        galleryCount: updated.gallery.length,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  export const deleteGalleryPhoto = async (req, res) => {
    try {
      const { slug, photoId } = req.params;

      await Invitation.findOneAndUpdate(
        { slug },
        { $pull: { gallery: { id: photoId } } }
      );

      res.json({ deleted: photoId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

export const uploadCoverVideo = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: "Video file missing" });
    }

    const videoUrl = `/uploads/videos/${req.file.filename}`;

    const invitation = await Invitation.findOneAndUpdate(
      { slug, user: req.user },
      { $set: { coverVideoUrl: videoUrl } },
      { returnDocument: "after" }
    );

    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }

    res.json({ coverVideoUrl: videoUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};