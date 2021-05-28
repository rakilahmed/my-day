import React, { useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';

import Post from './Post';
import { useStyles } from '../../Util';

const Posts = ({ posts, onAddPost, onEditPost, onDeletePost }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const [titleStatus, setTitleStatus] = useState(false);
  const [bodyStatus, setBodyStatus] = useState(false);

  const handleForm = (event) => {
    setShowForm(!showForm);
    setTitleInput('');
    setBodyInput('');
    setTitleStatus(false);
    setBodyStatus(false);
  };

  const validateTitle = (event) => {
    setTitleInput(event.target.value);
    event.target.value === '' ? setTitleStatus(false) : setTitleStatus(true);
  };

  const validateBody = (event) => {
    setBodyInput(event.target.value);
    event.target.value === '' ? setBodyStatus(false) : setBodyStatus(true);
  };

  const handleAddPost = (event) => {
    event.preventDefault();
    onAddPost(titleInput, bodyInput, new Date());
    setShowForm(!showForm);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleForm}
          style={
            !showForm
              ? {
                  background: '#90c695',
                  borderRadius: '50px',
                }
              : { background: '#F88379', borderRadius: '50px' }
          }
        >
          {!showForm ? 'Create New Post' : 'Cancel'}
        </Button>
      </div>
      {showForm && (
        <form
          onSubmit={handleAddPost}
          noValidate
          style={{
            maxWidth: '34rem',
            margin: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              marginTop={2}
              className={classes.label}
              autoComplete="off"
              style={{ flex: '1' }}
            >
              <TextField
                id="outlined-basic"
                fullWidth
                required
                label="Post Title"
                variant="outlined"
                value={titleInput}
                onChange={validateTitle}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              style={{
                marginTop: '20px',
                marginLeft: '10px',
                background: '#90c695',
                borderRadius: '50px',
              }}
              disabled={!titleStatus || !bodyStatus}
            >
              Post
            </Button>
          </div>
          <Box marginTop={2} className={classes.root} autoComplete="off">
            <TextField
              id="outlined-basic"
              fullWidth
              required
              label="Post Body"
              variant="outlined"
              multiline
              rows={5}
              value={bodyInput}
              onChange={validateBody}
            />
          </Box>
        </form>
      )}
      <div>
        {posts.map((post) => {
          return (
            <React.Fragment key={post.postId}>
              <Post
                post={post}
                onEditPost={onEditPost}
                onDeletePost={onDeletePost}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
