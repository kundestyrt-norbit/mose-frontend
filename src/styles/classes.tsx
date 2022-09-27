import { CSSProperties } from 'react';

export const truncate: CSSProperties = {
  flex: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const truncateParent: CSSProperties = { overflow: 'hidden' };

export const outline: CSSProperties = {
  outline: '1px solid red',
  outlineOffset: '-4px',
};
