import React, { HTMLProps, ReactNode } from 'react';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

interface LinkWithIconProps extends HTMLProps<HTMLLinkElement> {
  icon: ReactNode;
  children: ReactNode;
}

/**
 * Link with icon displayed on the left.
 */
const LinkWithIcon = ({ icon, href, children }: LinkWithIconProps) => {
  return (
    <div>
      <LinkWithIconGrid href={href}>
        {icon}
        <span>{children}</span>
      </LinkWithIconGrid>
    </div>
  );
};

export const LinkWithIconGridRouter = styled(Link)`
  display: inline-grid;
  grid-template-columns: 1em auto;
  gap: 0.6em;
  line-height: 1;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  margin: 0.6em 0;

  color: inherit;

  & > *:first-of-type {
    align-self: center;
    justify-self: center;
  }
`;

const LinkWithIconGrid = styled('a')`
  display: inline-grid;
  grid-template-columns: 1em auto;
  gap: 0.6em;
  line-height: 1;

  margin: 0.6em 0;

  color: inherit;

  & > *:first-of-type {
    align-self: center;
    justify-self: center;
  }
`;

export default LinkWithIcon;
