import NodeFilterOption from "@/lib/report/reportModel/NodeFilterOption";
import {NodeFilterOptionType} from "@/lib/report/reportModel/NodeFilterOptionType";
import ListItem from "@/components/lib/ListItem";
import {NodeFilterOptionComparisonType} from "@/lib/report/reportModel/NodeFilterOptionComparisonType";
import ReportParameter from "@/lib/report/reportModel/ReportParameter";

export default class NodeFilterOptionFactory
{
  // ==========================================================
  // Public Class Methods
  // ==========================================================

  /**
   * get a new variable node filter option
   * @param name - the name of the option.
   */
  public static newVariableNodeFilterOption(name: string): NodeFilterOption
  {
    return new NodeFilterOption(NodeFilterOptionType.VARIABLE, name);
  }

  /**
   * get a new select node filter option
   * @param options - the option list to use
   * @param name - the name of the option
   */
  public static newSelectNodeFilterOption(name: string, options: ListItem[]): NodeFilterOption
  {
    return new NodeFilterOption(NodeFilterOptionType.SELECT_OPTION, name, options);
  }

  /**
   * build a comparison select node filter option for a generic field
   * @param name - the name of the option
   */
  public static buildComparisonSelectNodeFilterOptionForField(name: string): NodeFilterOption
  {
    const options: ListItem[] = [
      {label: "Equal", value: NodeFilterOptionComparisonType.EQ},
      {label: "Like", value: NodeFilterOptionComparisonType.LIKE},
      {label: "Less Than", value: NodeFilterOptionComparisonType.LT},
      {label: "Greater Than", value: NodeFilterOptionComparisonType.GT},
      {label: "Not Null", value: NodeFilterOptionComparisonType.NOT_NULL},
    ];

    return new NodeFilterOption(NodeFilterOptionType.SELECT_OPTION, name, options);
  }

  /**
   * build a node filter option form json definition
   * @param json - json filter option definition
   * @param params - report parameters
   */
  public static buildNodeFilterOptionFromJson(json: any, params: ReportParameter[]): NodeFilterOption
  {
    const newOption = new NodeFilterOption(json.type, json.name, json.options as ListItem[]);
    newOption.identifier = json.identifier;
    newOption.value = json.value;

    const matchingParam = params.find((param) => `{${param.id}}` === newOption.value);
    if (matchingParam)
    {
      newOption.value = matchingParam;
    }

    return newOption;
  }
}
