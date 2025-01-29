/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import userImg from "../assets/images/user.jpg";
import noImg from "../assets/images/no-img.png";
import "./Blogs.css";

const Blogs = ({ onBack, onCreateBlog, editPost, isEditing }) => {
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [titleValue, setTitleValue] = useState(true);
  const [contentValue, setContentValue] = useState(true);

  useEffect(() => {
    if (isEditing && editPost) {
      setImage(editPost.image);
      setTitle(editPost.title);
      setContent(editPost.content);
      setShowForm(true);
    } else {
      setImage(null);
      setTitle("");
      setContent("");
      setShowForm(false);
    }
  }, [isEditing, editPost]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const maxSize = 1 * 1024 * 1024;

      if (file.size > maxSize) {
        alert("File size exceeds 1 MB");
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setTitleValue(true);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setContentValue(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      if (!title) setTitleValue(false);
      if (!content) setContentValue(false);
      return;
    }

    const newBlog = {
      image: image || noImg,
      title,
      content,
    };
    onCreateBlog(newBlog, isEditing);
    setImage(null);
    setTitle("");
    setContent("");
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onBack();
    }, 3000);
  };

  return (
    <div className="blogs">
      <div className="blogs-left">
        <img src={userImg} alt="User Image" />
      </div>
      <div className="blogs-right">
        {!showForm && !submitted && (
          <button className="post-btn" onClick={() => setShowForm(true)}>
            Create New Post
          </button>
        )}
        {submitted && <p className="submission-message">Post Submitted!</p>}
        <div className={`blogs-right-form ${showForm ? "visible" : "hidden"}`}>
          <h1>{isEditing ? "Edit Post" : "New Post"}</h1>
          <form onSubmit={handleSubmit}>
            <div className="img-upload">
              <label htmlFor="file-upload" className="file-upload">
                <i className="bx bx-upload"></i>Upload Image
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleImageChange}
              />
            </div>
            <input
              type="text"
              placeholder="Add Title (Max 60 Characters)"
              className={`title-input ${!titleValue ? "invalid" : ""}`}
              value={title}
              onChange={handleTitleChange}
              maxlength={60}
            />
            <textarea
              className={`text-input ${!contentValue ? "invalid" : ""}`}
              placeholder="Add Text"
              value={content}
              onChange={handleContentChange}
            ></textarea>
            <button type="submit" className="submit-btn" >
              {isEditing ? "Update Post" : "Submit Post"}
            </button>
          </form>
        </div>
        <button className="blogs-close-btn" onClick={onBack}>
          Back <i className="bx bx-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Blogs;
