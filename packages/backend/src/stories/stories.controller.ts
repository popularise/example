import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import StoryDTO from './story.dto';
import Story from './story.entity';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get('/')
  async getStories(): Promise<Story[]> {
    return await this.storiesService.getAll();
  }

  @Post('/')
  async createStory(@Body() story: StoryDTO): Promise<Story> {
    return await this.storiesService.create(story);
  }

  @Get(':storyId')
  async getStoryDetails(
    @Param('storyId', ParseIntPipe) storyId: number,
  ): Promise<Story> {
    return await this.storiesService.getById(storyId);
  }

  @Patch(':storyId')
  async editStoryDetails(
    @Param('storyId', ParseIntPipe) storyId: number,
    @Body() story: StoryDTO,
  ): Promise<void> {
    await this.storiesService.edit(storyId, story);
  }

  @Delete(':storyId')
  async deleteStory(@Param('storyId', ParseIntPipe) storyId: number) {
    return await this.storiesService.remove(storyId);
  }
}
