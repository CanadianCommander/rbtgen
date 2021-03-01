import ReportNode from "@/lib/report/reportModel/ReportNode";
import ReportQueryService from "@/lib/report/ReportQueryService";
import SqlGenerationError from "@/lib/report/sql/error/SqlGenerationError";

export default class TemplateUtil
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * replace column tags with there fully qualified column name
   * @param sql - the sql to transform.
   * @param currentNode - the node at which the sql occurs
   */
  public static replaceColumnTags(sql: string, currentNode: ReportNode): string
  {
    return this.mapTags(sql, (tag) =>
    {
      const tableNameMatch = tag.match(/([^.]+)\.([^.]+)/);
      if (tableNameMatch)
      {
        const queryService = new ReportQueryService();
        const closestNode = queryService.getClosestNodeByName(tableNameMatch[1], currentNode);
        if (!closestNode)
        {
          throw new SqlGenerationError(`Could not locate node for table [${tableNameMatch[1]}] referenced by sql template [${sql}]`);
        }

        return `${closestNode.transientId}.${tableNameMatch[2]}`;
      }
      else
      {
        return `${currentNode.transientId}.${tag}`;
      }
    });
  }

  // ==========================================================
  // Protected class methods
  // ==========================================================

  /**
   * apply a map like operation on each tag in the provided template sql.
   * @param sql - the sql template
   * @param callback - a callback that transforms the value of the tag. It's return value will replace the tag
   * @protected
   */
  protected static mapTags(sql: string, callback: (tag: string) => string): string
  {
    const matchResults: string[] = [];
    for (const match of sql.matchAll(/{{([^}]*)}}/g))
    {
      matchResults.push(callback(match[1]));
    }

    matchResults.forEach((result) =>
    {
      sql = sql.replace(/{{[^}]*}}/, result);
    });

    return sql;
  }
}
