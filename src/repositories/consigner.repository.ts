import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Consigner, ConsignerRelations} from '../models';

export class ConsignerRepository extends DefaultCrudRepository<
  Consigner,
  typeof Consigner.prototype.id,
  ConsignerRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Consigner, dataSource);
  }
}
