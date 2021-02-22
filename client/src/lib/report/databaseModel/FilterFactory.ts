import Filter from "@/lib/report/databaseModel/Filter";
import Entity from "@/lib/report/databaseModel/Entity";
import DatabaseModelError from "@/lib/report/databaseModel/error/DatabaseModelError";

export default class FilterFactory
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * build a Filter form a filter def
   * @param filterName - the name of the filter
   * @param filterDef - the filter def found in the schema file
   * @param entities - a list of entities in the schema. used for mapping required entities
   * @return new filter
   * @protected
   */
  public static buildFieldFromSchemaDef(filterName: string, filterDef: any, entities: Entity[]): Filter
  {
    const requiredEntities: Entity[] = [];
    if (filterDef.required_tables)
    {
      filterDef.required_tables.forEach((tableName: string) =>
      {
        const reqEntity = entities.find((entity) => entity.name === tableName);
        if (reqEntity === null)
        {
          throw new DatabaseModelError(`Filter ${filterName} specifies unknown required table ${tableName}`);
        }

        requiredEntities.push(reqEntity);
      });
    }

    return new Filter(filterName, filterDef.sql, requiredEntities);
  }
}
