import Campaign from 'src/campaigns/campaign.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'stories' })
class Story {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public ig_id: string;

  @Column({ type: 'bigint' })
  public views: number;

  @Column({ type: 'bigint' })
  public swipes: number;

  @Column({ type: 'bigint' })
  public clicks: number;

  @Column({ type: 'date', name: 'postedat' })
  public postedAt: Date;

  @ManyToOne(() => Campaign, (campaign) => campaign.stories, { eager: true })
  @JoinColumn({ name: 'campaignid' })
  campaign: Campaign;
}

export default Story;
