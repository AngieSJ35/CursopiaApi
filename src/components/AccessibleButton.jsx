import React from 'react';
import { Link } from 'react-router-dom';
import { useTalkback } from './useTalkback';

function AccessibleButton({ children, onClick, linkTo, className = 'button', ariaLabel, disabled }) {
  const talkbackText = ariaLabel || (typeof children === 'string' ? children : '');
  const talkback = useTalkback(talkbackText);

  if (linkTo) {
    return (
      <Link to={linkTo} className={`${className} ${disabled ? 'disabled' : ''}`} {...talkback}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled} {...talkback}>
      {children}
    </button>
  );
}
export default AccessibleButton;