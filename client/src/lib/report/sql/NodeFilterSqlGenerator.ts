import NodeFilter from "@/lib/report/reportModel/NodeFilter";
import {NodeFilterType} from "@/lib/report/reportModel/NodeFilterType";
import TemplateUtil from "@/lib/report/sql/TemplateUtil";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import NodeFilterGeneric, {OPTION} from "@/lib/report/reportModel/NodeFilterGeneric";
import {NodeFilterOptionComparisonType} from "@/lib/report/reportModel/NodeFilterOptionComparisonType";
import ReportQueryService from "@/lib/report/ReportQueryService";
import SqlGenerationError from "@/lib/report/sql/error/SqlGenerationError";

export default class NodeFilterSqlGenerator
{
  // ==========================================================
  // Public Class Methods
  // ==========================================================

  /**
   * generate SQL for this filter.
   * @param filter
   * @param reportNode - the node of this filter
   */
  public static generateSql(filter: NodeFilter, reportNode: ReportNode): string
  {
    switch (filter.filterType)
    {
      case NodeFilterType.GENERIC_FILTER:
        return this.generateSqlGenericFilter(filter as NodeFilterGeneric, reportNode);
      case NodeFilterType.CUSTOM_FILTER:
        return this.generateSqlCustomFilter(filter, reportNode);
    }
  }

  /**
   * generate sql for a list of node filters joined by AND.
   * @param filters - filters to generate SQL for
   * @param reportNode - the node on which the filter applies
   */
  public static generateSqlForFilters(filters: NodeFilter[], reportNode: ReportNode): string
  {
    return filters.reduce((sql: string, filter, index) =>
    {
      if (index !== (filters.length - 1))
      {
        return `${sql}${this.generateSql(filter, reportNode)} AND\n`;
      }
      return `${sql}${this.generateSql(filter, reportNode)}`;
    }, "");
  }

  // ==========================================================
  // Protected Class Methods
  // ==========================================================

  protected static generateSqlGenericFilter(filter: NodeFilterGeneric, reportNode: ReportNode): string
  {
    if (filter.field.isCustom)
    {
      // TODO this probably doesn't work
      return `${filter.field.customSql} ${filter.getOptionByIdentifier(OPTION.COMPARISON_MODE).value} ${filter.getOptionByIdentifier(OPTION.VALUE).value}`;
    }
    else
    {
      let value = filter.getOptionByIdentifier(OPTION.VALUE).value;
      if (!filter.field.isNumeric)
      {
        value = `'${value}'`;
      }

      const filterNode = (new ReportQueryService()).getClosestNodeByName(filter.field.entity.name, reportNode);
      if (!filterNode)
      {
        throw new SqlGenerationError(
          `Filter ${filter.name} references entity ${filter.field.entity.name} which is not a child of node ${reportNode.entity.name}`);
      }

      switch (filter.getOptionByIdentifier(OPTION.COMPARISON_MODE).value)
      {
        case NodeFilterOptionComparisonType.NOT_NULL:
          return `${filterNode.transientId}.${filter.field.name} ${filter.getOptionByIdentifier(OPTION.COMPARISON_MODE).value}`;
        default:
          return `${filterNode.transientId}.${filter.field.name} ${filter.getOptionByIdentifier(OPTION.COMPARISON_MODE).value} ${value}`;
      }
    }
  }

  /**
   * generate sql for a custom filter
   * @param filter
   * @param reportNode - the node of this filter
   * @protected
   */
  protected static generateSqlCustomFilter(filter: NodeFilter, reportNode: ReportNode): string
  {
    const sql = filter.filter.sql;
    const variableReplacements: {tag: string; value: string}[] = [];

    filter.options.forEach((option) =>
    {
      variableReplacements.push({tag: option.identifier, value: option.value});
    });

    return `(${TemplateUtil.replaceColumnTags(TemplateUtil.replaceVariableTags(sql, variableReplacements), reportNode).trimEnd()})`;
  }
}
