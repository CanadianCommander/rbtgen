import Entity from "@/lib/report/databaseModel/Entity";
import {RelationType} from "@/lib/report/databaseModel/RelationType";

export default class Relation
{
  protected _name: string;
  protected _from: Entity;
  protected _to: Entity;
  protected _type: RelationType;
  protected _joinConditionSql: string;

  // ==========================================================
  // Public methods
  // ==========================================================

  constructor(name: string, from: Entity, to: Entity, type: RelationType, joinConditionSql: string)
  {
    this._name = name;
    this._from = from;
    this._to = to;
    this._type = type;
    this._joinConditionSql = joinConditionSql;
  }

}
