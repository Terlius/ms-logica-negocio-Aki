import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PropertyType,
  Property,
} from '../models';
import {PropertyTypeRepository} from '../repositories';

export class PropertyTypePropertyController {
  constructor(
    @repository(PropertyTypeRepository)
    public propertyTypeRepository: PropertyTypeRepository,
  ) { }

  @get('/property-types/{id}/property', {
    responses: {
      '200': {
        description: 'Property belonging to PropertyType',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Property),
          },
        },
      },
    },
  })
  async getProperty(
    @param.path.number('id') id: typeof PropertyType.prototype.id,
  ): Promise<Property> {
    return this.propertyTypeRepository.property(id);
  }
}
