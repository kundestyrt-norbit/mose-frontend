import { Button, Divider } from '@mui/material';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { styled } from '@mui/system';
import Router, { useRouter } from 'next/router';

const MenuBar = (): JSX.Element => {
  const router = useRouter();
  return (
    <div style={{ position: 'absolute' }}>
      <DashboardWrapper>
        <Link href='/sensor'>
          <Button
            variant='text'
            color={router.asPath.includes('map') ? 'primary' : 'secondary'}
          >
            Map
          </Button>
        </Link>
        <Link href=''>
          <Button variant='text'>Dashboard</Button>
        </Link>
        <Link href=''>
          <Button variant='text'>List</Button>
        </Link>
      </DashboardWrapper>
      <Divider />
    </div>
  );
};

export const DashboardWrapper = styled('div')`
  display: flex;
  width: 100%;
  border: 1px solid red;
  justify-content: center;
  & > * {
    margin: 20px 50px 20px 50px;
    font-size: larger;
  }
`;
export default MenuBar;
