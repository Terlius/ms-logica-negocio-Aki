import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Comment} from './comment.model';
import {Client} from './client.model';
import {Property} from './property.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_request_status_clientId: {
        name: "fk_request_status_clientId",
        entity: "Client",
        entityKey: "id",
        foreignKey: "clientId"
      },
      fk_request_propertyId: {
        name: "fk_request_propertyId",
        entity: "Property",
        entityKey: "id",
        foreignKey: "propertyId"
      },



    },
  },
})
export class Request extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @hasMany(() => Comment)
  comments: Comment[];

  @belongsTo(() => Client)
  clientId: number;

  @belongsTo(() => Property)
  propertyId: number;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
