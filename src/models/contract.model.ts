import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Request} from './request.model';
import {Consigner} from './consigner.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_contract_requestId: {
        name: "fk_contract_requestId",
        entity: "Request",
        entityKey: "id",
        foreignKey: "requestId"
      },
      fk_contract_consignerId: {
        name: "fk_contract_consignerId",
        entity: "Consigner",
        entityKey: "id",
        foreignKey: "consignerId"
      },
      
    },
  },
})
export class Contract extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'string',
    required: true,
  })
  file: string;

  @belongsTo(() => Request)
  requestId: number;

  @belongsTo(() => Consigner)
  consignerId: number;

  constructor(data?: Partial<Contract>) {
    super(data);
  }
}

export interface ContractRelations {
  // describe navigational properties here
}

export type ContractWithRelations = Contract & ContractRelations;
