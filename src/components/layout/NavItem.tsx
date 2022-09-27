import { Button } from '@mui/material';
import React, { ReactNode } from 'react';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  icon: ReactNode;
  title: string;
}

const NavItem = ({ href, icon, title }: NavItemProps): JSX.Element => {
  return (
    <Link href={href}>
      <Button variant='contained' startIcon={icon}>
        {title}
      </Button>
    </Link>
  );
};

export default NavItem;
