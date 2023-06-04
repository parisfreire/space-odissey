import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsageDocument = HydratedDocument<Usage>;

@Schema()
export class Usage {
  @Prop()
  prompt_tokens: number;

  @Prop()
  completion_tokens: number;

  @Prop()
  total_tokens: number;
}

export const UsageSchema = SchemaFactory.createForClass(Usage);
