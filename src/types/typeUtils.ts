import Folder from "../types/Folder.type";
import Chunk from "../types/Chunk.type";
import Node from "../types/Node.type";

export function isFolder(item: Node): item is Folder {
  return (item as Folder).childIds !== undefined;
}

export function isChunk(item: Node): item is Chunk {
  return (item as Chunk).content !== undefined;
}