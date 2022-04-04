import { IsString, IsBoolean } from 'class-validator';

export default class CampaignDTO {
  @IsString()
  public company: string;

  @IsBoolean()
  public open: boolean;
}
