import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import Campaign from 'src/campaigns/campaign.entity';
import { CampaignsModule } from 'src/campaigns/campaigns.module';
import { StoriesModule } from 'src/stories/stories.module';
import Story from 'src/stories/story.entity';
import { CampaignsSeed } from './campaigns.seed';
import { StoriesSeed } from './stories.seed';

@Module({
  imports: [CommandModule, CampaignsModule, StoriesModule],
  providers: [CampaignsSeed, StoriesSeed],
  exports: [CampaignsSeed, StoriesSeed],
})
export class SeedsModule {}
