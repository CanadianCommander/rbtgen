import NodeFilter from "@/lib/report/reportModel/NodeFilter";
import {NodeFilterType} from "@/lib/report/reportModel/NodeFilterType";
import Field from "@/lib/report/databaseModel/Field";
import NodeFilterOptionFactory from "@/lib/report/reportModel/NodeFilterOptionFactory";
import {NodeFilterOptionComparisonType} from "@/lib/report/reportModel/NodeFilterOptionComparisonType";
import NodeFilterOption from "@/lib/report/reportModel/NodeFilterOption";

export enum OPTION
{
  COMPARISON_MODE = "comparison_mode",
  VALUE = "value",
}

export default class NodeFilterGeneric extends NodeFilter
{
  protected _field: Field;

  // ==========================================================
  // Public Methods
  // ==========================================================

  constructor(field: Field, options: NodeFilterOption[] = null)
  {
    super(null);
    this._field = field;

    if (options)
    {
      this._options = options;
    }
    else
    {
      this.buildOptions();
    }
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get filterType(): NodeFilterType
  {
    return NodeFilterType.GENERIC_FILTER;
  }

  get name(): string
  {
    return this._field.name;
  }

  get field(): Field
  {
    return this._field;
  }

  // ==========================================================
  // Protected Methods
  // ==========================================================

  protected buildOptions(): void
  {
    this._options = [];

    const comparisonSelect = NodeFilterOptionFactory.buildComparisonSelectNodeFilterOptionForField("Comparison Type");
    comparisonSelect.identifier = OPTION.COMPARISON_MODE;
    comparisonSelect.value = NodeFilterOptionComparisonType.EQ;

    const valueSelect = NodeFilterOptionFactory.newVariableNodeFilterOption("Value");
    valueSelect.identifier = OPTION.VALUE;

    this._options.push(valueSelect);
    this._options.push(comparisonSelect);
  }
}
