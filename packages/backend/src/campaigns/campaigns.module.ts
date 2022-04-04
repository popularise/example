import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Story from 'src/stories/story.entity';
import Campaign from './campaign.entity';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign, Story])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
  exports: [TypeOrmModule],
})
export class CampaignsModule {}
