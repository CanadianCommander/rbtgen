import Entity from "@/lib/report/databaseModel/Entity";

export default class Filter
{
  protected _name: string;
  protected _sql: string;
  protected _requiredEntities: Entity[];

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(name: string, sql: string, requiredEntities: Entity[])
  {
    this._name = name;
    this._sql = sql;
    this._requiredEntities = requiredEntities;
  }
}
