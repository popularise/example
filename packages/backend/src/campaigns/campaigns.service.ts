import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Story from 'src/stories/story.entity';
import { Repository } from 'typeorm';
import Campaign from './campaign.entity';
import CampaignDTO from './campaign.dto';
import CampaignWithRevenue from './campaignWithRevenue.interface';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}

  async getAll(): Promise<Campaign[]> {
    return await this.campaignsRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getById(campaignId: number): Promise<Campaign> {
    return await this.campaignsRepository.findOne(campaignId);
  }

  async create(campaign: CampaignDTO): Promise<Campaign> {
    return await this.campaignsRepository.save({
      ...campaign,
      createdAt: new Date(),
    });
  }

  async edit(campaignId: number, campaign: CampaignDTO) {
    return await this.campaignsRepository.update(campaignId, campaign);
  }

  async remove(campaignId: number): Promise<void> {
    await this.campaignsRepository.delete(campaignId);
  }

  async getAverageViews() {
    const sql = `SELECT c.company, AVG(s.views) AS average_views FROM stories s LEFT JOIN campaigns c on c.id = s.campaignid GROUP BY c.company ORDER BY average_views DESC`;
    return await this.campaignsRepository.query(sql);
  }

  async getKInfluencers(
    type: 'worst' | 'top',
    k: number,
    campaignId?: number,
  ): Promise<Story[]> {
    let sql = `SELECT ig_id, SUM(views) AS views
      FROM stories`;

    if (campaignId) sql += ` WHERE campaignid = ${campaignId}`;

    sql += ` GROUP BY ig_id ORDER BY views ${
      type === 'worst' ? 'ASC' : 'DESC'
    } LIMIT ${k}`;

    return await this.campaignsRepository.query(sql);
  }

  async getKCampaignsPerRevenue(k: number): Promise<CampaignWithRevenue[]> {
    const sql = `SELECT SUM(s.clicks) AS clicks, c.company as company FROM stories s LEFT JOIN campaigns c ON c.id = s.campaignid GROUP BY c.id ORDER BY clicks DESC LIMIT ${k}`;
    const results = await this.campaignsRepository.query(sql);

    return results.map((result) => {
      return { ...result, revenue: result.clicks * 0.01 };
    });
  }
}
