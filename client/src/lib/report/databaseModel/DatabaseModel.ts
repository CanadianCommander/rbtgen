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

  // ==========================================================
  // Getters
  // ==========================================================

  get entities(): Entity[]
  {
    return this._entities;
  }
}
