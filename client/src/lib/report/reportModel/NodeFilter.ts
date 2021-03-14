import Filter from "@/lib/report/databaseModel/Filter";
import {NodeFilterType} from "@/lib/report/reportModel/NodeFilterType";
import NodeFilterOption from "@/lib/report/reportModel/NodeFilterOption";
import TemplateUtil from "@/lib/report/sql/TemplateUtil";
import NodeFilterOptionFactory from "@/lib/report/reportModel/NodeFilterOptionFactory";

export default class NodeFilter
{
  protected _filter: Filter;
  protected _options: NodeFilterOption[] = [];

  // ==========================================================
  // Public Methods
  // ==========================================================

  /**
   *
   * @param filter - filter on which to base this node filter
   * @param options - list of node filter options. Should be null unless loading from file
   */
  constructor(filter: Filter, options: NodeFilterOption[] = null)
  {
    this._filter = filter;
    if (options)
    {
      this._options = options;
    }
    else
    {
      this.buildOptions();
    }
  }

  /**
   * get option by it's identifier
   * @param identifier - the id to search for
   * @return the option or null
   */
  public getOptionByIdentifier(identifier: string): NodeFilterOption
  {
    return this._options.find((opt) => opt.identifier === identifier);
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get filterType(): NodeFilterType
  {
    return NodeFilterType.CUSTOM_FILTER;
  }

  get name(): string
  {
    return this._filter.name;
  }

  get filter(): Filter
  {
    return this._filter;
  }

  get options(): NodeFilterOption[]
  {
    return this._options;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set options(options: NodeFilterOption[])
  {
    this._options = options;
  }

  // ==========================================================
  // Protected Methods
  // ==========================================================

  protected buildOptions(): void
  {
    this._options = [];
    const variableTags: string[] = TemplateUtil.getVariableTags(this._filter.sql);

    variableTags.forEach((tag) =>
    {
      const newOption = NodeFilterOptionFactory.newVariableNodeFilterOption(tag);
      newOption.identifier = tag;
      this._options.push(newOption);
    });
  }
}
