const express = require('express');
const router = express.Router();
const postData = require('../models/Post-Data');

router.get('/', (req, res) => {
  res.redirect('/posts');
});

router.get('/posts', async (req, res) => {
  try {
    const allPosts = await postData.find();
    res.send(allPosts);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.get('/posts/:uid', async (req, res) => {
  const userId = req.params.uid;
  try {
    const userPosts = await postData.find({ uid: userId });
    res.send(userPosts);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.post('/posts', async (req, res) => {
  const data = req.body;
  const post = new postData(data);
  await post.save();
  res.send(post);
});

router.put('/posts/:uid/:pId', async (req, res) => {
  const userId = req.params.uid;
  const postId = req.params.pId;
  let post;
  try {
    post = await postData.findOneAndUpdate({ uid: userId, postId }, req.body);
    const data = await postData.findOne({ uid: userId, postId });
    res.send(post);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.delete('/posts/:uid', async (req, res) => {
  const userId = req.params.uid;
  try {
    const post = await postData.findOne({ uid: userId });
    const deleted = await postData.deleteMany({ uid: userId });
    res.send(deleted);
  } catch (err) {
    res.json({ msg: err });
  }
});

router.delete('/posts/:uid/:pId', async (req, res) => {
  const userId = req.params.uid;
  const postId = req.params.pId;
  try {
    const post = await postData.findOneAndDelete({ uid: userId, postId });
    res.send(post);
  } catch (err) {
    res.json({ msg: err });
  }
});

module.exports = router;
