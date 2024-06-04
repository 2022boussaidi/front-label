import React from "react";

const Messages = () => {
  return (
    <div>
      <h6>Messages</h6>
      <div className="message-list">
        <div className="message-item">
          <div className="message-content">Hello!</div>
        </div>
        <div className="message-item">
          <div className="message-content">How are you doing?</div>
        </div>
        <div className="message-item">
          <div className="message-content">I'm good, thanks!</div>
        </div>
        <div className="message-item">
          <div className="message-content">What about you?</div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
