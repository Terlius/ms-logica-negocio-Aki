import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PropertyType, PropertyTypeRelations, Property} from '../models';
import {PropertyRepository} from './property.repository';

export class PropertyTypeRepository extends DefaultCrudRepository<
  PropertyType,
  typeof PropertyType.prototype.id,
  PropertyTypeRelations
> {

  public readonly property: BelongsToAccessor<Property, typeof PropertyType.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PropertyRepository') protected propertyRepositoryGetter: Getter<PropertyRepository>,
  ) {
    super(PropertyType, dataSource);
    this.property = this.createBelongsToAccessorFor('property', propertyRepositoryGetter,);
    this.registerInclusionResolver('property', this.property.inclusionResolver);
  }
}
