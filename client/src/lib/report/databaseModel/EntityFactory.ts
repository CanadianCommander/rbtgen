import UserDocument from "@/lib/user/model/UserDocument";
import Entity from "@/lib/report/databaseModel/Entity";
import YAML from "yaml";
import Field from "@/lib/report/databaseModel/Field";
import Relation from "@/lib/report/databaseModel/Relation";
import FieldFactory from "@/lib/report/databaseModel/FieldFactory";
import RelationFactory from "@/lib/report/databaseModel/RelationFactory";
import Filter from "@/lib/report/databaseModel/Filter";
import FilterFactory from "@/lib/report/databaseModel/FilterFactory";

export default class EntityFactory
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * load the list of database entities from the definitions in the schema file
   * @param schemaDocument - the schema file containing the entity definitions
   * @return an array of entities
   * @protected
   */
  public static loadEntitiesFromSchema(schemaDocument: UserDocument): Entity[]
  {
    const schema = YAML.parse(atob(schemaDocument.fileData));
    const entities: Entity[] = EntityFactory.loadEntities(schema);

    EntityFactory.loadFieldsForEntities(schema, entities);
    EntityFactory.loadRelationsForEntities(schema, entities);
    EntityFactory.loadFiltersForEntities(schema, entities);

    return entities;
  }

  // ==========================================================
  // Protected class methods
  // ==========================================================

  protected static loadEntities(schema: any): Entity[]
  {
    const entities: Entity[] = [];

    Object.entries(schema.models).forEach((entry: any[]) =>
    {
      const tableName = entry[0];
      entities.push(new Entity(tableName));
    });

    return entities;
  }

  /**
   * build schema fields array based on schema yaml spec
   * @param schema - the schema json
   * @param entities - entities to load fields for
   * @return the updated entities
   * @protected
   */
  protected static loadFieldsForEntities(schema: any, entities: Entity[]): Entity[]
  {
    entities.forEach((entity: Entity) =>
    {
      if (schema.models[entity.name].fields)
      {
        const fields: Field[] = [];

        Object.entries(schema.models[entity.name].fields).forEach((entry: any[]) =>
        {
          const fieldName = entry[0];
          const fieldDef = entry[1];
          fields.push(FieldFactory.buildFieldFromSchemaDef(fieldName, fieldDef));
        });

        entity.fields = fields;
      }
    });

    return entities;
  }

  /**
   * load relations for entity list
   * @param schema - schema containing the relation definition
   * @param entities - the entities to load relations for
   * @return the (now modified) list of entities passed in for convenience
   * @protected
   */
  protected static loadRelationsForEntities(schema: any, entities: Entity[]): Entity[]
  {
    entities.forEach((entity) =>
    {
      if (schema.models[entity.name].relations)
      {
        const relations: Relation[] = [];
        Object.entries(schema.models[entity.name].relations).forEach((entry: any) =>
        {
          const relationName: string = entry[0];
          const relationDef: any = entry[1];

          relations.push(RelationFactory.buildRelationFromSchemaDef(relationName, relationDef, entity, entities));
        });

        entity.relations = relations;
      }
    });

    return entities;
  }

  protected static loadFiltersForEntities(schema: any, entities: Entity[]): Entity[]
  {
    entities.forEach((entity) =>
    {
      if (schema.models[entity.name].filters)
      {
        const filters: Filter[] = [];
        Object.entries(schema.models[entity.name].filters).forEach((entry: any) =>
        {
          filters.push(FilterFactory.buildFieldFromSchemaDef(entry[0], entry[1], entities));
        });

        entity.filters = filters;
      }
    });

    return entities;
  }

}
