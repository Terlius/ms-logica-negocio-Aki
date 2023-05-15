import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RequestStatus,
  Request,
} from '../models';
import {RequestStatusRepository} from '../repositories';

export class RequestStatusRequestController {
  constructor(
    @repository(RequestStatusRepository)
    public requestStatusRepository: RequestStatusRepository,
  ) { }

  @get('/request-statuses/{id}/request', {
    responses: {
      '200': {
        description: 'Request belonging to RequestStatus',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Request),
          },
        },
      },
    },
  })
  async getRequest(
    @param.path.number('id') id: typeof RequestStatus.prototype.id,
  ): Promise<Request> {
    return this.requestStatusRepository.request(id);
  }
}
