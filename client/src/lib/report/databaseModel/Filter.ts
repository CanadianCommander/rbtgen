import Entity from "@/lib/report/databaseModel/Entity";

export default class Filter
{
  protected _name: string;
  protected _sql: string;
  protected _entity: Entity;
  protected _requiredEntities: Entity[];

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(name: string, sql: string, requiredEntities: Entity[])
  {
    this._name = name;
    this._sql = sql;
    this._requiredEntities = requiredEntities;
    this._entity = null;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get name(): string
  {
    return this._name;
  }

  get sql(): string
  {
    return this._sql;
  }

  get entity(): Entity
  {
    return this._entity;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set entity(entity: Entity)
  {
    this._entity = entity;
  }
}
