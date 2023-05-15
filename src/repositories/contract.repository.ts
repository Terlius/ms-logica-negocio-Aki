import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Contract, ContractRelations, Request, Consigner} from '../models';
import {RequestRepository} from './request.repository';
import {ConsignerRepository} from './consigner.repository';

export class ContractRepository extends DefaultCrudRepository<
  Contract,
  typeof Contract.prototype.id,
  ContractRelations
> {

  public readonly request: BelongsToAccessor<Request, typeof Contract.prototype.id>;

  public readonly consigner: BelongsToAccessor<Consigner, typeof Contract.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('ConsignerRepository') protected consignerRepositoryGetter: Getter<ConsignerRepository>,
  ) {
    super(Contract, dataSource);
    this.consigner = this.createBelongsToAccessorFor('consigner', consignerRepositoryGetter,);
    this.registerInclusionResolver('consigner', this.consigner.inclusionResolver);
    this.request = this.createBelongsToAccessorFor('request', requestRepositoryGetter,);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
  }
}
