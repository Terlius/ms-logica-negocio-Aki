import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Request} from './request.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_request_status_requestId: {
        name: "fk_request_status_requestId",
        entity: "Request",
        entityKey: "id",
        foreignKey: "requestId"
      },
      
     
      
    },
  },
})
export class RequestStatus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  approved: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  rejectd: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  revision: boolean;

  @belongsTo(() => Request)
  requestId: number;

  constructor(data?: Partial<RequestStatus>) {
    super(data);
  }
}

export interface RequestStatusRelations {
  // describe navigational properties here
}

export type RequestStatusWithRelations = RequestStatus & RequestStatusRelations;
