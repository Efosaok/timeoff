import React, { FC } from "react";

interface FlashMessagesProps {
  errors?: string[];
  messages?: string[];
};

const FlashMessages: FC<FlashMessagesProps> = ({ errors, messages }) => (
    <div className="flash-messages">
      {/* {{# if flash }} */}
        {/* {{#if flash.errors }} */}
            {/* {{# each flash.errors }} */}

              {errors?.map((error) => (
                <div key={error} className="alert alert-danger" role="alert">
                  {error}
                </div>
              ))}
            {/* {{/each}} */}
        {/* {{/if}} */}
        {/* {{#if flash.messages }} */}
            {/* {{# each flash.messages }} */}
              {messages?.map((message) => (
                <div key={message} className="alert alert-success" role="alert">
                  {message}
                </div>
              ))}
            {/* {{/each}} */}
        {/* {{/if}} */}
    {/* {{/if}} */}
    </div>
  );

export default FlashMessages;
