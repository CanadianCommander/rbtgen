import Field from "@/lib/report/databaseModel/Field";
import NodeOutput from "@/lib/report/reportModel/NodeOutput";
import DatabaseModel from "@/lib/report/databaseModel/DatabaseModel";
import AggregationFactory from "@/lib/report/reportModel/AggregationFactory";
import ReportModelError from "@/lib/report/reportModel/error/ReportModelError";

export default class NodeOutputFactory
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * build a new node output form the provided field
   * @param field - the field to use when building the output
   * @return a new node output
   */
  public static buildNodeOutputFromField(field: Field): NodeOutput
  {
    return new NodeOutput(field);
  }

  /**
   * build a new array of node outputs form the provided fields
   * @param fields - the fields to use when building the output array
   * @return a new node output
   */
  public static buildNodeOutputFromFields(fields: Field[]): NodeOutput[]
  {
    const outputs: NodeOutput[] = [];
    fields.forEach((field: Field) =>
    {
      outputs.push(this.buildNodeOutputFromField(field));
    });

    return outputs;
  }

  /**
   * build a new node output from the information in the json hash.
   * @param json - node output json
   * @param databaseModel - the database model for this report
   * @return a new field output
   */
  public static buildNodeOutputFromJson(json: any, databaseModel: DatabaseModel): NodeOutput
  {
    const field: Field = databaseModel.getEntityByName(json.entity).getFieldByName(json.field);
    if (!field)
    {
      throw new ReportModelError(`Node output of entity, [${json.entity}] uses non existent field [${json.field}]`);
    }

    return new NodeOutput(field, json.alias, json.staticPrefix, json.staticSuffix, AggregationFactory.buildAggregation(json.aggregationType));
  }

  /**
   * like buildNodeOutputFromJson but operates on arrays
   * @param jsonArray - node output json
   * @param databaseModel - the database model for this report
   */
  public static buildNodeOutputsFromJson(jsonArray: any, databaseModel: DatabaseModel): NodeOutput[]
  {
    const outputs: NodeOutput[] = [];
    jsonArray.forEach((nodeJson: any) =>
    {
      outputs.push(this.buildNodeOutputFromJson(nodeJson, databaseModel));
    });

    return outputs;
  }
}
