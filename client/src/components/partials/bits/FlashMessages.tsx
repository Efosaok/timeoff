import React, { FC } from "react";

interface FlashMessagesProps {
  errors?: string[];
  messages?: string[];
  show?: boolean;
};

const FlashMessages: FC<FlashMessagesProps> = ({ errors, messages, show }) => (
    show ? (
      <div className="flash-messages">
      {errors?.map((error) => (
        <div key={error} className="alert alert-danger" role="alert">
          {error}
        </div>
      ))}
      {messages?.map((message) => (
        <div key={message} className="alert alert-success" role="alert">
          {message}
        </div>
      ))}
    </div>
    ) : null
  );

export default FlashMessages;
