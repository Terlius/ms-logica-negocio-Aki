import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comment,
  Request,
} from '../models';
import {CommentRepository} from '../repositories';

export class CommentRequestController {
  constructor(
    @repository(CommentRepository)
    public commentRepository: CommentRepository,
  ) { }

  @get('/comments/{id}/request', {
    responses: {
      '200': {
        description: 'Request belonging to Comment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async getRequest(
    @param.path.number('id') id: typeof Comment.prototype.id,
  ): Promise<Request> {
    return this.commentRepository.request(id);
  }
}
