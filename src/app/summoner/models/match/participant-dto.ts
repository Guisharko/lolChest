import {RuneDto} from './rune-dto';
import {ParticipantStatsDto} from './participant-stats-dto';
import {ParticipantTimelineDto} from './participant-timeline-dto';
import {MasteryDto} from './mastery-dto';

export class ParticipantDto {
  participantId: number;
  championId: number;
  runes: RuneDto[];
  stats: ParticipantStatsDto;
  teamId: number;
  timeline: ParticipantTimelineDto;
  spell1Id: number;
  spell2Id: number;
  highestAchievedSeasonTier: string;
  masteries: MasteryDto[];
}
