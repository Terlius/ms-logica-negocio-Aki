import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Adviser,
  Property,
} from '../models';
import {AdviserRepository} from '../repositories';

export class AdviserPropertyController {
  constructor(
    @repository(AdviserRepository) protected adviserRepository: AdviserRepository,
  ) { }

  @get('/advisers/{id}/properties', {
    responses: {
      '200': {
        description: 'Array of Adviser has many Property',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Property>,
  ): Promise<Property[]> {
    return this.adviserRepository.properties(id).find(filter);
  }

  @post('/advisers/{id}/properties', {
    responses: {
      '200': {
        description: 'Adviser model instance',
        content: {'application/json': {schema: getModelSchemaRef(Property)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Adviser.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {
            title: 'NewPropertyInAdviser',
            exclude: ['id'],
            optional: ['adviserId']
          }),
        },
      },
    }) property: Omit<Property, 'id'>,
  ): Promise<Property> {
    return this.adviserRepository.properties(id).create(property);
  }

  @patch('/advisers/{id}/properties', {
    responses: {
      '200': {
        description: 'Adviser.Property PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Property, {partial: true}),
        },
      },
    })
    property: Partial<Property>,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.adviserRepository.properties(id).patch(property, where);
  }

  @del('/advisers/{id}/properties', {
    responses: {
      '200': {
        description: 'Adviser.Property DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Property)) where?: Where<Property>,
  ): Promise<Count> {
    return this.adviserRepository.properties(id).delete(where);
  }
}
