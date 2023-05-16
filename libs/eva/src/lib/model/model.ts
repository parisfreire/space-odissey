import { v4 as uuid } from 'uuid';

// Class can be used as interface too.
export class Prompt {
  constructor(public id: string = uuid(), public text: string = '', public type: PromptType = PromptType.UNDEFINED) {
  }
}

export enum PromptType {
  HUMAN = 'HUMAN',
  MACHINE = 'MACHINE',
  UNDEFINED = 'UNDEFINED'
}
