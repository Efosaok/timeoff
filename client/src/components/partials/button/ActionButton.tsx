import React, { FC } from "react";

interface NativeButtonProps {
  id?: string;
  className?: string;
  onClick: () => void;
  type: 'button' | 'submit';
}
interface ActionButtonProps {
  nativeProps?: NativeButtonProps;
  text: string;
  isLoading?: boolean;
};

const ActionButton: FC<ActionButtonProps> = ({ nativeProps, text, isLoading }) => (
  <button {...nativeProps} disabled={isLoading}>
    <div className="action-btn-content">
      {isLoading ? <div className="loader"/> : null} {text}
    </div>
  </button>
);

export default ActionButton;
