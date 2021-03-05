import SimpleAggregation from "@/lib/report/reportModel/aggregators/SimpleAggregation";

export default class SimpleAggregationSerializer
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * convert the given simple aggregation to a hash
   * @param aggregation - aggregation to convert
   */
  public static serializeHash(aggregation: SimpleAggregation): any
  {
    return {
      type: aggregation.type,
    };
  }
}
