import React, { FC, ReactNode } from "react";

interface NativeButtonProps {
  id?: string;
  className?: string;
  onClick: () => void;
  type: 'button' | 'submit';
  'data-toggle'?: string;
  'data-placement'?: string;
  title?: string;
}
interface ActionButtonProps {
  nativeProps?: NativeButtonProps;
  text?: string;
  isLoading?: boolean;
  children?: ReactNode;
  noLoader?: boolean;
};

const ActionButton: FC<ActionButtonProps> = ({
  nativeProps,
  text,
  children,
  isLoading,
  noLoader,
}) => (
  <button {...nativeProps} disabled={isLoading}>
    <div className="action-btn-content">
      {(isLoading && !noLoader) ? <div className="loader"/> : null} {text || children}
    </div>
  </button>
);

export default ActionButton;
