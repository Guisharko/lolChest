import {TeamStatsDto} from './team-stats-dto';
import {ParticipantIdentityDto} from './participant-identity-dto';
import {ParticipantDto} from './participant-dto';

export class MatchDto {
  gameId: string;
  participantIdentities: ParticipantIdentityDto[];
  queueId: number;
  gameType: string;
  gameDuration: string;
  teams: TeamStatsDto[];
  platformId: string;
  gameCreation: string;
  seasonId: number;
  gameVersion: string;
  mapId: number
  gameMode: string;
  participants: ParticipantDto[];
  participantsArray: any;
}
