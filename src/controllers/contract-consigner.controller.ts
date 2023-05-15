import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contract,
  Consigner,
} from '../models';
import {ContractRepository} from '../repositories';

export class ContractConsignerController {
  constructor(
    @repository(ContractRepository)
    public contractRepository: ContractRepository,
  ) { }

  @get('/contracts/{id}/consigner', {
    responses: {
      '200': {
        description: 'Consigner belonging to Contract',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Consigner),
          },
        },
      },
    },
  })
  async getConsigner(
    @param.path.number('id') id: typeof Contract.prototype.id,
  ): Promise<Consigner> {
    return this.contractRepository.consigner(id);
  }
}
