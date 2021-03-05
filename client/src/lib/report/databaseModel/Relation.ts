import Entity from "@/lib/report/databaseModel/Entity";
import {RelationType} from "@/lib/report/databaseModel/RelationType";
import Field from "@/lib/report/databaseModel/Field";

export default class Relation
{
  protected _name: string;
  protected _from: Entity;
  protected _to: Entity;
  protected _requiredFields: Field[];
  protected _type: RelationType;
  protected _joinConditionSql: string;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(name: string, from: Entity, to: Entity, requiredFields: Field[], type: RelationType, joinConditionSql: string)
  {
    this._name = name;
    this._from = from;
    this._to = to;
    this._requiredFields = requiredFields;
    this._type = type;
    this._joinConditionSql = joinConditionSql;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get to(): Entity
  {
    return this._to;
  }

  get type(): RelationType
  {
    return this._type;
  }

  get conditionSql(): string
  {
    return this._joinConditionSql;
  }

  get name(): string
  {
    return this._name;
  }
}
