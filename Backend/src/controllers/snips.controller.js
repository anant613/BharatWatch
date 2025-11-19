import Snip from "../models/snip.model.js";

// GET all snips / reels
export const getAllSnips = async (req, res) => {
  try {
    const snips = await Snip.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(snips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single snip by ID
export const getSnipById = async (req, res) => {
  try {
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ error: "Snip not found" });
    res.status(200).json(snip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE a new snip/reel
export const createSnip = async (req, res) => {
  try {
    const {
      videoUrl,
      title,
      caption,
      songTitle,
      artist,
    } = req.body;
    const newSnip = new Snip({
      videoUrl,
      title,
      caption,
      songTitle,
      artist,
      comments: [],
      likeCount: 0,
    });
    await newSnip.save();
    res.status(201).json(newSnip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADD a comment to a snip
export const addComment = async (req, res) => {
  try {
    const { user, text, profile } = req.body;
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ error: "Snip not found" });

    snip.comments.push({
      user,
      text,
      profile,
      likes: 0,
      replies: 0,
    });
    await snip.save();
    res.status(200).json(snip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LIKE a snip / reel
export const likeSnip = async (req, res) => {
  try {
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ error: "Snip not found" });

    snip.likeCount += 1;
    await snip.save();
    res.status(200).json({ likeCount: snip.likeCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a snip
export const deleteSnip = async (req, res) => {
  try {
    const snip = await Snip.findByIdAndDelete(req.params.id);
    if (!snip) return res.status(404).json({ error: "Snip not found" });
    res.status(200).json({ message: "Snip deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
