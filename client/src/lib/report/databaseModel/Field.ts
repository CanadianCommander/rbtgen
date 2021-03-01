import {FieldType} from "@/lib/report/databaseModel/FieldType";
import Entity from "@/lib/report/databaseModel/Entity";

export default class Field
{
  // ==========================================================
  // Properties from schema file
  // ==========================================================
  protected _name: string;
  protected _type: FieldType;
  protected _primaryKey: boolean;
  protected _sql: string;
  protected _entity: Entity;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(name: string, type: FieldType, isPrimaryKey: boolean, sql = "")
  {
    this._name = name;
    this._type = type;
    this._primaryKey = isPrimaryKey;
    this._sql = sql;
    this._entity = null;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get name(): string
  {
    return this._name;
  }

  get entity(): Entity
  {
    return this._entity;
  }

  get type(): FieldType
  {
    return this._type;
  }

  get customSql(): string
  {
    return this._sql;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set entity(entity: Entity)
  {
    this._entity = entity;
  }
}
