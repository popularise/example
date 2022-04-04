import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import CampaignDTO from './campaign.dto';
import Story from 'src/stories/story.entity';
import Campaign from './campaign.entity';
import CampaignWithRevenue from './campaignWithRevenue.interface';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get('/')
  async getCampaigns(): Promise<Campaign[]> {
    return await this.campaignsService.getAll();
  }

  @Get('/getRevenues')
  async getCampaignsRevenues(): Promise<CampaignWithRevenue[]> {
    return await this.campaignsService.getKCampaignsPerRevenue(10);
  }

  @Post('/')
  async createCampaign(@Body() campaign: CampaignDTO): Promise<Campaign> {
    return await this.campaignsService.create(campaign);
  }

  @Get('/top-k-influencers')
  async getKInfluencers(
    @Query('k', ParseIntPipe) k: number,
    @Query('type') type: 'worst' | 'top',
    @Query('campaignId') campaignId?: number,
  ): Promise<Story[]> {
    return await this.campaignsService.getKInfluencers(type, k, campaignId);
  }

  @Get('average-views')
  async getAverageViews() {
    return await this.campaignsService.getAverageViews();
  }

  @Get(':campaignId')
  async getCampaignDetails(
    @Param('campaignId', ParseIntPipe) campaignId: number,
  ): Promise<Campaign> {
    return await this.campaignsService.getById(campaignId);
  }

  @Patch(':campaignId')
  async editCampaignDetails(
    @Param('campaignId', ParseIntPipe) campaignId: number,
    @Body() campaign: CampaignDTO,
  ): Promise<void> {
    await this.campaignsService.edit(campaignId, campaign);
  }

  @Delete(':campaignId')
  async deleteCampaign(@Param('campaignId', ParseIntPipe) campaignId: number) {
    return await this.campaignsService.remove(campaignId);
  }
}
