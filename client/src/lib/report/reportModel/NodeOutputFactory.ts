import Field from "@/lib/report/databaseModel/Field";
import NodeOutput from "@/lib/report/reportModel/NodeOutput";

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
}
