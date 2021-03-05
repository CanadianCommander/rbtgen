import SimpleAggregation from "@/lib/report/reportModel/aggregators/SimpleAggregation";

export default class SimpleAggregationSqlGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  public static generateSql(aggregation: SimpleAggregation, nodeSql: string): string
  {
    return `${aggregation.sqlFunctionName}(${nodeSql})`;
  }
}
