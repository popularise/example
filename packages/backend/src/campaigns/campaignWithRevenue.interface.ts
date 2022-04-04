interface Campaign {
  id: number;
  company: string;
  clicks: number;
}

export default interface CampaignWithRevenue extends Campaign {
  revenue: number;
}
