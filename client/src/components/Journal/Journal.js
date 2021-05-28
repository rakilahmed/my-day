import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

import Posts from './Post/Posts';
import { useAuth } from '../../AuthContext';

const URI = 'https://myday-posts.vercel.app/posts/';

const Journal = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const timeOut = (time) => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
    }, time);
  };

  const fetchPosts = async () => {
    timeOut(500);
    const res = await axios.get(URI + `${currentUser.uid}`);
    setPosts(res.data.reverse());
  };

  const addPost = async (title, body, time) => {
    await axios.post(URI, {
      uid: `${currentUser.uid}`,
      postId: Math.floor(Math.random() * 10000) + 1,
      userName: `${currentUser.displayName}`,
      userEmail: `${currentUser.email}`,
      title,
      body,
      createdAt: time,
      modifiedAt: time,
    });
    fetchPosts();
  };

  const editPost = async (postId, editedTitle, editedBody, editTime) => {
    await axios.put(URI + `${currentUser.uid}/${postId}`, {
      title: editedTitle,
      body: editedBody,
      modifiedAt: editTime,
    });
    fetchPosts();
  };

  const deletePost = async (postId) => {
    await axios.delete(URI + `${currentUser.uid}/${postId}`);
    fetchPosts();
  };

  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress style={{ color: '#fff' }} />
      </div>
    );
  }

  return (
    <div className="card-container">
      <Posts
        posts={posts}
        onAddPost={addPost}
        onEditPost={editPost}
        onDeletePost={deletePost}
      />
    </div>
  );
};

export default Journal;
