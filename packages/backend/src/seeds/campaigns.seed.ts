import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Campaign from 'src/campaigns/campaign.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { join } from 'path';

@Injectable()
export class CampaignsSeed {
  constructor(
    @InjectRepository(Campaign)
    private campaignsRepository: Repository<Campaign>,
  ) {}

  @Command({
    command: 'create:campaigns',
    describe: 'creates campaigns from csv',
  })
  async create() {
    const csvData: Promise<any[]> = new Promise((resolve, reject) => {
      const stream = fs.createReadStream(
        join(__dirname, '..', 'data', 'campaigns.csv'),
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

    const campaigns: any[] = await csvData;

    for (const campaign of campaigns) {
      const insert = await this.campaignsRepository.save({
        id: campaign.id,
        company: campaign.company,
        createdAt: campaign.created_at,
        open: campaign.open === 'true' ? true : false,
      });
    }

    console.log('CAMPAIGNS SEEDING: DONE');
  }
}
