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
import {Adviser} from '../models';
import {AdviserRepository} from '../repositories';

export class AdviserController {
  constructor(
    @repository(AdviserRepository)
    public adviserRepository : AdviserRepository,
  ) {}

  @post('/adviser')
  @response(200, {
    description: 'Adviser model instance',
    content: {'application/json': {schema: getModelSchemaRef(Adviser)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adviser, {
            title: 'NewAdviser',
            exclude: ['id'],
          }),
        },
      },
    })
    adviser: Omit<Adviser, 'id'>,
  ): Promise<Adviser> {
    return this.adviserRepository.create(adviser);
  }

  @get('/adviser/count')
  @response(200, {
    description: 'Adviser model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Adviser) where?: Where<Adviser>,
  ): Promise<Count> {
    return this.adviserRepository.count(where);
  }

  @get('/adviser')
  @response(200, {
    description: 'Array of Adviser model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Adviser, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Adviser) filter?: Filter<Adviser>,
  ): Promise<Adviser[]> {
    return this.adviserRepository.find(filter);
  }

  @patch('/adviser')
  @response(200, {
    description: 'Adviser PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adviser, {partial: true}),
        },
      },
    })
    adviser: Adviser,
    @param.where(Adviser) where?: Where<Adviser>,
  ): Promise<Count> {
    return this.adviserRepository.updateAll(adviser, where);
  }

  @get('/adviser/{id}')
  @response(200, {
    description: 'Adviser model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Adviser, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Adviser, {exclude: 'where'}) filter?: FilterExcludingWhere<Adviser>
  ): Promise<Adviser> {
    return this.adviserRepository.findById(id, filter);
  }

  @patch('/adviser/{id}')
  @response(204, {
    description: 'Adviser PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Adviser, {partial: true}),
        },
      },
    })
    adviser: Adviser,
  ): Promise<void> {
    await this.adviserRepository.updateById(id, adviser);
  }

  @put('/adviser/{id}')
  @response(204, {
    description: 'Adviser PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() adviser: Adviser,
  ): Promise<void> {
    await this.adviserRepository.replaceById(id, adviser);
  }

  @del('/adviser/{id}')
  @response(204, {
    description: 'Adviser DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.adviserRepository.deleteById(id);
  }
}
