import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {RequestStatus, RequestStatusRelations, Request} from '../models';
import {RequestRepository} from './request.repository';

export class RequestStatusRepository extends DefaultCrudRepository<
  RequestStatus,
  typeof RequestStatus.prototype.id,
  RequestStatusRelations
> {

  public readonly request: BelongsToAccessor<Request, typeof RequestStatus.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>,
  ) {
    super(RequestStatus, dataSource);
    this.request = this.createBelongsToAccessorFor('request', requestRepositoryGetter,);
    this.registerInclusionResolver('request', this.request.inclusionResolver);
  }
}
