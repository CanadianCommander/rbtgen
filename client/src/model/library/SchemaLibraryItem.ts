import LibraryItem from "@/model/library/LibraryItem";
import {LibraryItemType} from "@/model/library/LibraryItemType";
import LibraryItemAction from "@/model/library/LibraryItemActions";
import {userApi} from "@/lib/api/Api";

export default class SchemaLibraryItem implements LibraryItem
{
  public description: string;
  public icon: string;
  public id: string;
  public meta: any;
  public name: string;

  protected onDeletedCallback: () => void

  // ==========================================================
  // Public Methods
  // ==========================================================

  constructor(
    id: string,
    name: string,
    icon: string,
    description = "",
    meta: any = null,
    onDeletedCallback: () => void = null)
  {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.meta = meta;
    this.onDeletedCallback = onDeletedCallback;
  }

  primaryAction(): void
  {
    // TODO what should we do when user clicks schema file? probably some sort of modal.
  }

  // ==========================================================
  // Getters
  // ==========================================================

  get type(): LibraryItemType
  {
    return LibraryItemType.SCHEMA;
  }

  get additionalActions(): LibraryItemAction[]
  {
    return [
      {text: "Download", callback: this.downloadSchemaFile.bind(this)},
      {text: "Delete", callback: this.deleteSchemaFile.bind(this)},
    ];
  }

  // ==========================================================
  // Protected Methods
  // ==========================================================

  protected async downloadSchemaFile(): Promise<void>
  {
    console.log("download");
  }

  protected async deleteSchemaFile(): Promise<void>
  {
    // TODO confirmation dialog

    try
    {
      await userApi.deleteDocument(this.id);

      if (this.onDeletedCallback)
      {
        this.onDeletedCallback();
      }
    }
    catch (error)
    {
      // TODO alert user
      console.error(error);
    }
  }

}
