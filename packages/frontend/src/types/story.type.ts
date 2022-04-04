import { Campaign } from "./campaign.type";

export type Story = {
  id?: number;
  ig_id: string;
  clicks: number;
  swipes: number;
  views: number;
  campaignId: number;
  campaign?: Campaign;
};
