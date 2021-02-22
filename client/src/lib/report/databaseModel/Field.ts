import {FieldType} from "@/lib/report/databaseModel/FieldType";

export default class Field
{
  protected _name: string;
  protected _type: FieldType;
  protected _primaryKey: boolean;
  protected _sql: string;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(name: string, type: FieldType, isPrimaryKey: boolean, sql = "")
  {
    this._name = name;
    this._type = type;
    this._primaryKey = isPrimaryKey;
    this._sql = sql;
  }

}
