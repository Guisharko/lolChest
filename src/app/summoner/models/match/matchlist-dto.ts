import {MatchReferenceDto} from './matchReferenceDto';

export class MatchlistDto {
  startIndex: number;
  totalGames: number;
  endIndex: number;
  matches: MatchReferenceDto[];
}
