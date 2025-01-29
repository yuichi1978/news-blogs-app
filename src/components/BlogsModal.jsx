/* eslint-disable react/prop-types */
import "./BlogsModal.css";

const BlogsModal = ({ show, blog, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="blogs-modal-image"
          />
        )}
        <h2 className="blogs-modal-title">
          {blog.title}
        </h2>
        <p className="blogs-post-content">
          {blog.content}
        </p>
      </div>
    </div>
  );
};

export default BlogsModal;
