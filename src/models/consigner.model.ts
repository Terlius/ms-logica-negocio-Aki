import {Entity, model, property} from '@loopback/repository';

@model()
export class Consigner extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    required: true,
  })
  surname: string;

  @property({
    type: 'string',
    required: true,
  })
  laborCharter: string;


  constructor(data?: Partial<Consigner>) {
    super(data);
  }
}

export interface ConsignerRelations {
  // describe navigational properties here
}

export type ConsignerWithRelations = Consigner & ConsignerRelations;
