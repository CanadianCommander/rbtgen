import {FieldType} from "@/lib/report/databaseModel/FieldType";
import Entity from "@/lib/report/databaseModel/Entity";
import ReportModelError from "@/lib/report/reportModel/error/ReportModelError";

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
  // Properties set dynamically in the editor
  // ==========================================================
  protected _alias: string = null;
  protected _staticPrefix: string = null;
  protected _staticSuffix: string = null;

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

  get alias(): string
  {
    return this._alias;
  }

  get staticPrefix(): string
  {
    return this._staticPrefix;
  }

  get staticSuffix(): string
  {
    return this._staticSuffix;
  }

  /**
   * returns true / false indicating if this field supports suffix / prefix settings
   */
  get supportsSuffixPrefix(): boolean
  {
    return this._type === FieldType.STRING ||
      this._type === FieldType.INTEGER ||
      this._type === FieldType.FLOAT;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set entity(entity: Entity)
  {
    this._entity = entity;
  }

  set alias(alias)
  {
    this._alias = alias;
  }

  set staticPrefix(prefix: string)
  {
    if (!this.supportsSuffixPrefix)
    {
      throw new ReportModelError("This field does not support prefix check supportsSuffixPrefix()");
    }

    this._staticPrefix = prefix;
  }

  set staticSuffix(suffix: string)
  {
    if (!this.supportsSuffixPrefix)
    {
      throw new ReportModelError("This field does not support suffix check supportsSuffixPrefix()");
    }

    this._staticSuffix = suffix;
  }
}
