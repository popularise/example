import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Campaign from 'src/campaigns/campaign.entity';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import Story from './story.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Campaign])],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [TypeOrmModule],
})
export class StoriesModule {}
