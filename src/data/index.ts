import Node from '../types/Node.type';
import TreeItem from '../types/TreeItem.type';

export default {
  0: {
    id: '0',
    name: 'Root',
    slug: 'root',
    active: false,
    editing: false,
    childIds: ['1', '5'],
  },
  1: {
    id: '1',
    name: 'Projects',
    slug: 'projects',
    active: false,
    editing: false,
    childIds: ['2'],
  } as Node,
  2: {
    id: '2',
    name: 'Project 1',
    slug: 'project-1',
    active: false,
    editing: false,
    childIds: [],
  } as Node,
  
  5: {
    id: '5',
    name: 'Inbox',
    slug: 'inbox',
    active: false,
    childIds: [],
    editing: false,
  } as Node
} as TreeItem;
