import * as React from 'react';
import { Vote } from '../Types/Vote';
import StoryPointCard from './StoryPointCard';

interface IVoteProps {
  vote: Vote;
}

export default function TalliedVote({ vote }: IVoteProps) {
  return (<div>
    <StoryPointCard />
    {vote.author}
  </div>);
}
