// controllers/snips.controller.js

import Snip from "../models/snip.model.js";

// GET all snips
export const getAllSnips = async (req, res) => {
  try {
    const snips = await Snip.find().sort({ createdAt: -1 });
    res.status(200).json(snips);
  } catch (err) {
    res.status(500).json({ message: "Error fetching snips", error: err });
  }
};

// GET one snip by ID
export const getSnipById = async (req, res) => {
  try {
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ message: "Snip not found" });
    res.status(200).json(snip);
  } catch (err) {
    res.status(500).json({ message: "Error fetching snip", error: err });
  }
};

// POST new snip (image/video URL, title, caption etc.)
export const createSnip = async (req, res) => {
  try {
    const { videoUrl, title, caption, songTitle, artist, comments, likeCount } =
      req.body;
    const snip = new Snip({
      videoUrl,
      title,
      caption,
      songTitle,
      artist,
      comments: comments || [],
      likeCount,
    });
    const savedSnip = await snip.save();
    res.status(201).json(savedSnip);
  } catch (err) {
    console.log("Snip Create Error ----", err); // Add this to see actual error in terminal
    res.status(400).json({ message: "Error creating snip", error: err });
  }
};

// POST comment
export const addComment = async (req, res) => {
  try {
    const { text, user, profile } = req.body;
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ message: "Snip not found" });

    const comment = { user, text, profile, likes: 0, replies: 0 };
    snip.comments.unshift(comment);
    await snip.save();
    res.status(201).json(snip.comments[0]);
  } catch (err) {
    res.status(400).json({ message: "Error adding comment", error: err });
  }
};

// LIKE Snip (increment likeCount)
export const likeSnip = async (req, res) => {
  try {
    const snip = await Snip.findById(req.params.id);
    if (!snip) return res.status(404).json({ message: "Snip not found" });
    snip.likeCount = (snip.likeCount || 0) + 1;
    await snip.save();
    res.status(200).json({ likeCount: snip.likeCount });
  } catch (err) {
    res.status(400).json({ message: "Error liking snip", error: err });
  }
};

// Delete a snip
export const deleteSnip = async (req, res) => {
  try {
    const snip = await Snip.findByIdAndDelete(req.params.id);
    if (!snip) return res.status(404).json({ message: "Snip not found" });
    res.status(200).json({ message: "Snip deleted." });
  } catch (err) {
    res.status(500).json({ message: "Error deleting snip", error: err });
  }
};
