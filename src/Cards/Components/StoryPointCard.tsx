import * as React from 'react';
import { Paper } from '@mui/material';
import { styled } from '@mui/styles';

const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '6.6rem',
  height: '9.2rem',
  margin: '1em',
  fontSize: '2rem'
}));

interface ICardProps {
  value?: string;
  onClick?: () => void;
}

export default function StoryPointCard({ value, onClick }: ICardProps) {
  return (
      <Item onClick={onClick}>
          {value}
      </Item>
  );
}
