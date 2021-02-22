import {LibraryItemType} from "@/model/library/LibraryItemType";
import LibraryItemAction from "@/model/library/LibraryItemActions";

// an item that can appear in the users library
export default abstract class LibraryItem
{
  public id: string;
  public name: string;
  public icon: string;
  public description: string;
  public type: LibraryItemType;
  public meta: any;
  public additionalActions: LibraryItemAction[];

  // ==========================================================
  // Public methods
  // ==========================================================

  public abstract primaryAction(): void ;

  // ==========================================================
  // Protected methods
  // ==========================================================

  protected constructor(
    id: string,
    name: string,
    icon: string,
    description = "",
    meta: any = null)
  {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.meta = meta;
  }
}
