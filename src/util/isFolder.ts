import Folder from "../types/Folder.type";
import Node from "../types/Node.type";

export function isFolder(item: Node): item is Folder {
  return (item as Folder).childIds !== undefined;
}