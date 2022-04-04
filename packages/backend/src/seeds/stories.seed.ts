import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Campaign from 'src/campaigns/campaign.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { join } from 'path';
import Story from 'src/stories/story.entity';

@Injectable()
export class StoriesSeed {
  constructor(
    @InjectRepository(Story)
    private storiesRepository: Repository<Story>,
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}

  @Command({
    command: 'create:stories',
    describe: 'creates stories from csv',
  })
  async create() {
    const csvData: Promise<any[]> = new Promise((resolve, reject) => {
      const stream = fs.createReadStream(
        join(__dirname, '..', 'data', 'stories.csv'),
      );
      let csvData: any[] = [];
      let csvStream = csv
        .parse({ headers: true })
        .on('data', async function (data) {
          csvData.push(data);
        })
        .on('end', async function () {
          resolve(csvData);
        });

      stream.pipe(csvStream);
    });

    const stories: any[] = await csvData;

    for (const story of stories) {
      const insert = await this.storiesRepository.save({
        ig_id: story.ig_id,
        views: story.views,
        clicks: story.clicks,
        swipes: story.swipes,
        postedAt: story.posted_at,
        campaign: await this.campaignsRepository.findOne(story.campaign_id),
      });
    }

    console.log('STORIES SEEDING: DONE');
  }
}
