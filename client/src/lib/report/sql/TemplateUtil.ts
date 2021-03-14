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
    return this.mapColumnTags(sql, (tag) =>
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

  /**
   * replace variable tags in sql with the provided replace values
   * @param sql - the sql to modify
   * @param replaceValues - replace value mapping tag -> value
   */
  public static replaceVariableTags(sql: string, replaceValues: {tag: string; value: string}[]): string
  {
    return this.mapVariableTags(sql, (tag) =>
    {
      const replace = replaceValues.find((repVal) => repVal.tag === tag);
      return replace ? replace.value : null;
    });
  }

  /**
   * get at list of variable tags found in the sql
   * @param sql
   */
  public static getVariableTags(sql: string): string[]
  {
    const tags: string[] = [];
    this.mapVariableTags(sql, (tag) =>
    {
      tags.push(tag);
      return null;
    });

    return tags;
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
      if (result != null)
      {
        sql = sql.replace(/{{[^}]*}}/, result);
      }
    });

    return sql;
  }

  /**
   * like mapTags but only invokes the callback on column type tags
   * @param sql - the sql template
   * @param callback - a callback that transforms the value of the tag. It's return value will replace the tag
   * @protected
   */
  protected static mapColumnTags(sql: string, callback: (tag: string) => string): string
  {
    return this.mapTags(sql, (tag: string) =>
    {
      if (!tag.match(/\$.*/))
      {
        return callback(tag);
      }
      return null;
    });
  }

  /**
   * like mapTags but only invokes the callback on variable type tags
   * @param sql - the sql template
   * @param callback - a callback that transforms the value of the tag. It's return value will replace the tag
   * @protected
   */
  protected static mapVariableTags(sql: string, callback: (tag: string) => string): string
  {
    return this.mapTags(sql, (tag: string) =>
    {
      if (tag.match(/\$.*/))
      {
        return callback(tag.replace("$", ""));
      }
      return null;
    });
  }
}
