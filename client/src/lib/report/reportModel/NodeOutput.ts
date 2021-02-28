import Field from "@/lib/report/databaseModel/Field";
import ReportModelError from "@/lib/report/reportModel/error/ReportModelError";
import {FieldType} from "@/lib/report/databaseModel/FieldType";
import Entity from "@/lib/report/databaseModel/Entity";
import Aggregation from "@/lib/report/reportModel/Aggregation";
import {AggregationType} from "@/lib/report/reportModel/AggregationType";
import AggregationFactory from "@/lib/report/reportModel/AggregationFactory";

export default class NodeOutput
{
  protected _field: Field = null;
  protected _alias: string = null;
  protected _staticPrefix: string = null;
  protected _staticSuffix: string = null;
  protected _aggregator: Aggregation = null;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(field: Field, alias = "", staticPrefix = "", staticSuffix = "")
  {
    this._field = field;
    this._alias = alias;
    this._staticPrefix = staticPrefix;
    this._staticSuffix = staticSuffix;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get field(): Field
  {
    return this._field;
  }

  get name(): string
  {
    return this._field.name;
  }

  get entity(): Entity
  {
    return this._field.entity;
  }

  get type(): FieldType
  {
    return this._field.type;
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

  get aggregator(): Aggregation
  {
    return this._aggregator;
  }

  get aggregatorType(): AggregationType
  {
    if (this._aggregator)
    {
      return this._aggregator.type;
    }
    return AggregationType.NONE;
  }

  /**
   * returns true / false indicating if this field supports suffix / prefix settings
   */
  get supportsSuffixPrefix(): boolean
  {
    return this._field.type === FieldType.STRING ||
      this._field.type === FieldType.INTEGER ||
      this._field.type === FieldType.FLOAT;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set alias(alias: string)
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

  set aggregator(newAggregator: Aggregation)
  {
    this._aggregator = newAggregator;
  }

  set aggregatorType(newType: AggregationType)
  {
    console.log("FOOOOO");
    this._aggregator = AggregationFactory.buildAggregation(newType);
  }
}
