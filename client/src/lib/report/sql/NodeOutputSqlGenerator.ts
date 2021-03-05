import NodeOutput from "@/lib/report/reportModel/NodeOutput";
import {FieldType} from "@/lib/report/databaseModel/FieldType";
import ReportNode from "@/lib/report/reportModel/ReportNode";
import TemplateUtil from "@/lib/report/sql/TemplateUtil";
import ReportQueryService from "@/lib/report/ReportQueryService";

export default class NodeOutputSqlGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * generate sql for the given node output.
   * @param nodeOutput
   * @param atRoot - is this sql being generated for the root node or not?
   * @param reportNode - the report node of this node output
   */
  public static generateSql(nodeOutput: NodeOutput, reportNode: ReportNode, atRoot = false): string
  {
    let fieldSql: string = this.generateFieldSql(nodeOutput, reportNode);

    if (nodeOutput.aggregator && reportNode.groupOutputs)
    {
      fieldSql = nodeOutput.aggregator.toSql(fieldSql);
    }

    fieldSql = this.applyPrefixSuffix(fieldSql, nodeOutput);

    if (atRoot && nodeOutput.alias)
    {
      fieldSql = this.applyAlias(fieldSql, nodeOutput);
    }
    else if (nodeOutput.aggregator && reportNode.groupOutputs)
    {
      // if we aggregate we must preserve the field name
      fieldSql += ` AS ${nodeOutput.name}`;
    }

    return fieldSql;
  }

  /**
   * generate sql for the field of this node output. This excludes aggregation, suffix, prefix, alias ... ect
   * @param nodeOutput
   * @param reportNode - the report node of this node output
   * @protected
   */
  public static generateFieldSql(nodeOutput: NodeOutput, reportNode: ReportNode): string
  {
    if (nodeOutput.type === FieldType.CUSTOM)
    {
      return TemplateUtil.replaceColumnTags(nodeOutput.field.customSql, reportNode);
    }
    if (nodeOutput.entity === reportNode.entity)
    {
      return `${reportNode.transientId}.${nodeOutput.field.name}`;
    }
    else
    {
      const reportQueryService = new ReportQueryService();
      const closestNode = reportQueryService.getClosestNodeByName(nodeOutput.entity.name, reportNode);

      return `${closestNode.transientId}.${nodeOutput.field.name}`;
    }
  }

  // ==========================================================
  // Protected class methods
  // ==========================================================

  /**
   * apply a suffix and prefix to the provided sql if applicable
   * @param sql - sql to transform
   * @param nodeOutput - the node output for this sql
   * @protected
   */
  protected static applyPrefixSuffix(sql: string, nodeOutput: NodeOutput): string
  {
    if (nodeOutput.staticPrefix)
    {
      sql = `CONCAT( '${nodeOutput.staticPrefix}', (${sql}))`;
    }

    if (nodeOutput.staticSuffix)
    {
      sql = `CONCAT((${sql}), '${nodeOutput.staticSuffix}')`;
    }

    return sql;
  }

  /**
   * apply a suffix to the provided sql if applicable
   * @param sql - sql to transform
   * @param nodeOutput - the node output for this sql
   * @protected
   */
  protected static applyAlias(sql: string, nodeOutput: NodeOutput): string
  {
    if (nodeOutput.alias)
    {
      sql = `${sql} AS '${nodeOutput.alias}'`;
    }

    return sql;
  }
}
