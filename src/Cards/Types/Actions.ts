import { Vote } from './Vote';

export type CastVote = (value: string, voter: string) => void;
export type ShowVotes = (votes: Vote[]) => void;
export type ResetVotes = (votes: Vote[]) => void;
