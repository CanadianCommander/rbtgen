import Field from "@/lib/report/databaseModel/Field";
import Relation from "@/lib/report/databaseModel/Relation";
import Filter from "@/lib/report/databaseModel/Filter";

export default class Entity
{
  protected _name: string;
  protected _fields: Field[] = [];
  protected _relations: Relation[] = [];
  protected _filters: Filter[] = [];

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(name: string)
  {
    this._name = name;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get name(): string
  {
    return this._name;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set fields(fields: Field[])
  {
    this._fields = fields;
  }

  set relations(relations: Relation[])
  {
    this._relations = relations;
  }

  set filters(filters: Filter[])
  {
    this._filters = filters;
  }
}
