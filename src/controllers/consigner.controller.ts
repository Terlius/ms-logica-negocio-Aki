import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Consigner} from '../models';
import {ConsignerRepository} from '../repositories';

export class ConsignerController {
  constructor(
    @repository(ConsignerRepository)
    public consignerRepository : ConsignerRepository,
  ) {}

  @post('/consigner')
  @response(200, {
    description: 'Consigner model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consigner)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consigner, {
            title: 'NewConsigner',
            exclude: ['id'],
          }),
        },
      },
    })
    consigner: Omit<Consigner, 'id'>,
  ): Promise<Consigner> {
    return this.consignerRepository.create(consigner);
  }

  @get('/consigner/count')
  @response(200, {
    description: 'Consigner model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consigner) where?: Where<Consigner>,
  ): Promise<Count> {
    return this.consignerRepository.count(where);
  }

  @get('/consigner')
  @response(200, {
    description: 'Array of Consigner model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consigner, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consigner) filter?: Filter<Consigner>,
  ): Promise<Consigner[]> {
    return this.consignerRepository.find(filter);
  }

  @patch('/consigner')
  @response(200, {
    description: 'Consigner PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consigner, {partial: true}),
        },
      },
    })
    consigner: Consigner,
    @param.where(Consigner) where?: Where<Consigner>,
  ): Promise<Count> {
    return this.consignerRepository.updateAll(consigner, where);
  }

  @get('/consigner/{id}')
  @response(200, {
    description: 'Consigner model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consigner, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Consigner, {exclude: 'where'}) filter?: FilterExcludingWhere<Consigner>
  ): Promise<Consigner> {
    return this.consignerRepository.findById(id, filter);
  }

  @patch('/consigner/{id}')
  @response(204, {
    description: 'Consigner PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consigner, {partial: true}),
        },
      },
    })
    consigner: Consigner,
  ): Promise<void> {
    await this.consignerRepository.updateById(id, consigner);
  }

  @put('/consigner/{id}')
  @response(204, {
    description: 'Consigner PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() consigner: Consigner,
  ): Promise<void> {
    await this.consignerRepository.replaceById(id, consigner);
  }

  @del('/consigner/{id}')
  @response(204, {
    description: 'Consigner DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.consignerRepository.deleteById(id);
  }
}
