import Entity from "@/lib/report/databaseModel/Entity";

export default class DatabaseModel
{
  protected _entities: Entity[];

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(entities: Entity[])
  {
    this._entities = entities;
  }

  /**
   * get an entity buy name
   * @param entityName - the name of the entity
   */
  public getEntityByName(entityName: string): Entity
  {
    return this.entities.find((entity) => entity.name === entityName);
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get entities(): Entity[]
  {
    return this._entities;
  }
}
