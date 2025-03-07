import React, { useState } from "react";
import styles from '../styles/Fanfiction.module.css'
const Fanfiction = () => {
  const [stories, setStories] = useState([]);
  const [newStory, setNewStory] = useState({ title: "", content: "" });
  const [comments, setComments] = useState({}); // Store comments per story

  // Handle Story Submission
  const handleStorySubmit = (e) => {
    e.preventDefault();
    if (!newStory.title || !newStory.content) return;

    const storyWithComments = { ...newStory, id: Date.now(), comments: [] };
    setStories([...stories, storyWithComments]);
    setNewStory({ title: "", content: "" });
  };

  // Handle Comment Submission
  const handleCommentSubmit = (storyId, comment) => {
    if (!comment.trim()) return;

    const updatedStories = stories.map((story) => {
      if (story.id === storyId) {
        return { ...story, comments: [...story.comments, comment] };
      }
      return story;
    });

    setStories(updatedStories);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Matt Murdock's Fanfiction Hub</h1>

      {/* Story Submission Form */}
      <form onSubmit={handleStorySubmit} className={styles.submitForm}>
        <input
          type="text"
          placeholder="Story Title"
          value={newStory.title}
          onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
          className={styles.inputField}
        />
        <textarea
          placeholder="Write your story..."
          value={newStory.content}
          onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
          className={styles.textareaField}
        />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {/* Display Stories */}
      <div className={styles.storyContainer}>
        <h2 className={styles.storyHeading}>Fanfiction Stories</h2>
        {stories.length === 0 ? (
          <p className={styles.noStories}>No stories yet. Be the first to write one!</p>
        ) : (
          stories.map((story) => (
            <div key={story.id} className={styles.storyCard}>
              <h3>{story.title}</h3>
              <p>{story.content}</p>

              {/* Comment Section */}
              <div className={styles.commentSection}>
                <h4>Comments:</h4>
                {story.comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  story.comments.map((comment, index) => (
                    <p key={index} className={styles.comment}>{comment}</p>
                  ))
                )}
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className={styles.inputField}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCommentSubmit(story.id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Fanfiction;
