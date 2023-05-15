import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Request} from './request.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_comment_requestId: {
        name: "fk_comment_requestId",
        entity: "Request",
        entityKey: "id",
        foreignKey: "requestId"
      },
      
    },
  },
})
export class Comment extends Entity {
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

  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => Request)
  requestId: number;

  constructor(data?: Partial<Comment>) {
    super(data);
  }
}

export interface CommentRelations {
  // describe navigational properties here
}

export type CommentWithRelations = Comment & CommentRelations;
