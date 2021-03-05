import Aggregation from "@/lib/report/reportModel/Aggregation";
import SimpleAggregationSerializer from "@/lib/report/reportModel/aggregators/SimpleAggregationSerializer";
import SimpleAggregationSqlGenerator from "@/lib/report/sql/SimpleAggregationSqlGenerator";
import {AggregationType} from "@/lib/report/reportModel/AggregationType";

export default class SimpleAggregation extends Aggregation
{
  protected _sqlFunction: string;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(aggregationType: AggregationType)
  {
    super(aggregationType);
    this._sqlFunction = aggregationType;
  }

  public toHash(): any
  {
    return SimpleAggregationSerializer.serializeHash(this);
  }

  public toSql(nodeSql: string): string
  {
    return SimpleAggregationSqlGenerator.generateSql(this, nodeSql);
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get configurable(): boolean
  {
    return false;
  }

  get sqlFunctionName(): string
  {
    return this._sqlFunction;
  }
}
