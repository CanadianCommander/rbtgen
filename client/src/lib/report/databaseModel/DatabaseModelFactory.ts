import UserDocument from "@/lib/user/model/UserDocument";
import DatabaseModel from "@/lib/report/databaseModel/DatabaseModel";
import EntityFactory from "@/lib/report/databaseModel/EntityFactory";

export default class DatabaseModelFactory
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  public static buildModelFromSchemaDocument(schemaDocument: UserDocument): DatabaseModel
  {
    return new DatabaseModel(EntityFactory.loadEntitiesFromSchema(schemaDocument));
  }
}
