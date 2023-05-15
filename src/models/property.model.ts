import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Adviser} from './adviser.model';
import {PropertyType} from './property-type.model';
import {Request} from './request.model';
import {City} from './city.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_request_status_adviserId: {
        name: "fk_request_status_adviserId",
        entity: "Adviser",
        entityKey: "id",
        foreignKey: "adviserId"
      },
      fk_request_status_propertyTypeId: {
        name: "fk_request_status_propertyTypeId",
        entity: "PropertyType",
        entityKey: "id",
        foreignKey: "propertyTypeId"
      },
      fk_property_: {
        name: "fk_property_city",
        entity: "City",
        entityKey: "id",
        foreignKey: "cityId"
      },



    },
  },
})
export class Property extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  lease?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  forRent: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  forSale: boolean;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @belongsTo(() => Adviser)
  adviserId: number;

  @belongsTo(() => PropertyType)
  propertyTypeId: number;

  @hasMany(() => Request)
  requests: Request[];

  @belongsTo(() => City)
  cityId: number;

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
