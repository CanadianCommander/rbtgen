import {AggregationType} from "@/lib/report/reportModel/AggregationType";
import Aggregation from "@/lib/report/reportModel/Aggregation";
import {FieldType} from "@/lib/report/databaseModel/FieldType";

export default class AggregationFactory
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  public static buildAggregation(type: AggregationType): Aggregation
  {
    return new Aggregation(type);
  }

  /**
   * build a list of aggregations compatible with the given field type
   * @param fieldType - the field type the aggregations are compatible with
   * @return array of compatible aggregations
   */
  public static buildAggregationsForFieldType(fieldType: FieldType): Aggregation[]
  {
    const aggregations: Aggregation[] = [];

    // compatible with every thing
    aggregations.push(this.buildAggregation(AggregationType.COUNT));
    aggregations.push(this.buildAggregation(AggregationType.COUNT_DISTINCT));
    aggregations.push(this.buildAggregation(AggregationType.GROUP_CONCAT));

    if (fieldType === FieldType.FLOAT || fieldType === FieldType.INTEGER)
    {
      aggregations.push(this.buildAggregation(AggregationType.SUM));
    }

    return aggregations;
  }

}
