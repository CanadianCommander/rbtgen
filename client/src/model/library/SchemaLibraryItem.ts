import LibraryItem from "@/model/library/LibraryItem";
import {LibraryItemType} from "@/model/library/LibraryItemType";
import LibraryItemAction from "@/model/library/LibraryItemActions";
import {userApi} from "@/lib/api/Api";
import UserDocument from "@/lib/user/model/UserDocument";
import {saveAs} from "file-saver";

export default class SchemaLibraryItem implements LibraryItem
{
  public description: string;
  public icon: string;
  public id: string;
  public meta: any;
  public name: string;

  protected onChange: () => void

  // ==========================================================
  // Public Methods
  // ==========================================================

  constructor(
    id: string,
    name: string,
    icon: string,
    description = "",
    meta: any = null,
    onChange: () => void = null)
  {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.meta = meta;
    this.onChange = onChange;
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
    const doc: UserDocument = await userApi.getDocument(this.id, true);
    saveAs(new Blob([atob(doc.fileData)], {type: "text/yml;charset=utf-8"}), doc.fileName);
  }

  protected async deleteSchemaFile(): Promise<void>
  {
    // TODO confirmation dialog

    try
    {
      await userApi.deleteDocument(this.id);

      if (this.onChange)
      {
        this.onChange();
      }
    }
    catch (error)
    {
      // TODO alert user
      console.error(error);
    }
  }

}
