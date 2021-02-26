import {AggregationType} from "@/lib/report/reportModel/AggregationType";

export default class Aggregation
{
  protected _aggregationType: AggregationType

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(aggregationType: AggregationType)
  {
    this._aggregationType = aggregationType;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get type(): AggregationType
  {
    return this._aggregationType;
  }

}
