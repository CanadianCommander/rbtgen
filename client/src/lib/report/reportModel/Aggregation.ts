import {AggregationType} from "@/lib/report/reportModel/AggregationType";

export default abstract class Aggregation
{
  protected _aggregationType: AggregationType

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(aggregationType: AggregationType)
  {
    this._aggregationType = aggregationType;
  }

  abstract toHash(): any;

  abstract toSql(nodeSql: string): string;

  // ==========================================================
  // Getters
  // ==========================================================

  get type(): AggregationType
  {
    return this._aggregationType;
  }

  abstract get configurable(): boolean;

}
