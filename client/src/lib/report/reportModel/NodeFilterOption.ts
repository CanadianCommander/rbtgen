import {NodeFilterOptionType} from "@/lib/report/reportModel/NodeFilterOptionType";
import ListItem from "@/components/lib/ListItem";

export default class NodeFilterOption
{
  protected _type: NodeFilterOptionType;
  protected _name: string;
  protected _options: ListItem[];
  protected _value: any;
  protected _identifier = "";

  // ==========================================================
  // Public Methods
  // ==========================================================

  constructor(type: NodeFilterOptionType, name: string, options: ListItem[] = null)
  {
    this._type = type;
    this._name = name;
    this._options = options;
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get type(): NodeFilterOptionType
  {
    return this._type;
  }

  get name(): string
  {
    return this._name;
  }

  get value(): any
  {
    return this._value;
  }

  get options(): ListItem[]
  {
    return this._options;
  }

  get identifier(): string
  {
    return this._identifier;
  }

  // ==========================================================
  // Setters
  // ==========================================================

  set value(value: any)
  {
    this._value = value;
  }

  set identifier(identifier: string)
  {
    this._identifier = identifier;
  }
}
