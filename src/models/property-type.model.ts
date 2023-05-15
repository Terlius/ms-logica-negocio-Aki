import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Property } from './property.model';

@model({
  settings: {
    foreignKeys:
    {
      fk_type_propertyId: {
        name: "fk_type_propertyId",
        entity: "Property",
        entityKey: "id",
        foreignKey: "propertyId"
      },


    },
  },
})
export class PropertyType extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  apartment: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  house: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  farm: boolean;

  @property({
    type: 'string',
    required: true,
  })
  other: string;

  @belongsTo(() => Property)
  propertyId: number;



  constructor(data?: Partial<PropertyType>) {
    super(data);
  }
}

export interface PropertyTypeRelations {
  // describe navigational properties here
}

export type PropertyTypeWithRelations = PropertyType & PropertyTypeRelations;
