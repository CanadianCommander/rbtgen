import {LibraryItemType} from "@/model/library/LibraryItemType";
import LibraryItemAction from "@/model/library/LibraryItemActions";

// an item that can appear in the users library
export default interface LibraryItem
{
  id: string;
  name: string;
  icon: string;
  description: string;
  type: LibraryItemType;
  meta: any;
  primaryAction: () => void;
  additionalActions: LibraryItemAction[];
}
