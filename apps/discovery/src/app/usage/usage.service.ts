import { Injectable } from '@nestjs/common';
import { Usage } from './schemas/usage.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsageService {

  constructor(@InjectModel(Usage.name) private readonly usageModel: Model<Usage>) {}

  async save(usageDto: Usage): Promise<Usage> {

    console.log(usageDto);

    return await this.usageModel.create(usageDto);
  }
}

