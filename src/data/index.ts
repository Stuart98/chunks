import ChunkType from "../types/ChunkType";

export const data = [
    {
        id: 1,
        name: 'Projects',
        slug: 'projects',
        chunk: null,
        children: [
            {
                id: 2,
                name: 'Project 1',
                slug: 'project-1',
                children: [
                    {
                        id: 9,
                        name: 'Project 1.1',
                        slug: 'project-1-1',
                        item: {
                            content: 'project 1 content'
                        }
                    },
                    {
                        id: 10,
                        name: 'Project 1.2',
                        slug: 'project-1-2',
                        item: {
                            content: `
                            
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum maximus vulputate velit. Sed rutrum pulvinar nisl porta rutrum. Donec lobortis imperdiet odio at dignissim. Integer vulputate dapibus sem id congue. Aliquam eu consectetur elit. Nullam pellentesque diam vitae auctor fringilla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam at iaculis tortor, ac vulputate leo. Aliquam ullamcorper enim ut enim auctor viverra. Nam ut turpis sed orci laoreet fermentum a eu dui. Integer tristique tristique congue. Aliquam ipsum quam, ornare et pulvinar vitae, pretium non urna. Nunc arcu diam, blandit sit amet urna a, tempor congue eros.
\n\r\n\r\n\r
                            Suspendisse quis congue libero. Vestibulum aliquet rutrum ligula, finibus dapibus nisi eleifend fringilla. Curabitur in tempus leo. In ac accumsan est. Suspendisse tempus dignissim enim ac suscipit. Praesent aliquam tellus non tellus congue, eget dapibus turpis hendrerit. Duis scelerisque augue nulla, fringilla aliquet enim laoreet quis. Integer hendrerit lobortis risus ac sollicitudin. Aliquam orci neque, tincidunt sit amet suscipit at, pretium eleifend odio. Sed convallis at arcu imperdiet tincidunt. In elit tortor, posuere quis est et, rutrum commodo neque. Praesent odio augue, porttitor vel nulla ut, aliquam pellentesque metus. Sed ac elit enim. Suspendisse aliquam tortor interdum purus bibendum sodales. Cras euismod ligula et enim tempus, ut lacinia ipsum vestibulum.
    \n\n\n                        
                            In posuere porta dapibus. In venenatis venenatis elit non ultrices. Cras tellus elit, pharetra nec augue eu, elementum sollicitudin dolor. Aenean cursus sagittis velit in condimentum. Quisque tortor turpis, eleifend eget gravida ut, tristique sit amet mi. Sed dictum luctus felis et bibendum. Vestibulum mattis ac orci vel venenatis. Donec sollicitudin nisl in vestibulum tincidunt.
        \n\n\n                    
                            Sed blandit sodales euismod. Suspendisse potenti. In vulputate sem non magna ultricies, ut rhoncus felis pretium. Nam fringilla, sapien ut viverra tincidunt, eros sapien facilisis nulla, non posuere turpis arcu nec neque. Integer egestas tincidunt purus id laoreet. Nunc commodo erat et aliquet rutrum. Ut tincidunt risus ac velit dignissim, eget viverra tortor eleifend. Pellentesque finibus accumsan maximus.
            \n\n\n                
                            Donec auctor, velit eu vestibulum sollicitudin, est ipsum rutrum tellus, id rhoncus arcu nulla nec arcu. Phasellus ut cursus augue. In pharetra mattis nulla quis convallis. Mauris vel turpis vitae enim sodales lacinia maximus nec tortor. Sed sit amet justo nisl. Maecenas ac cursus sapien. Sed semper fermentum tristique. Nulla sed cursus lacus. Nullam neque nisl, tempus in libero nec, aliquam accumsan ex. Mauris nec quam mi. In hac habitasse platea dictumst. Phasellus congue tempor risus, eget cursus nulla fermentum a.                            
                            `
                        }
                    },
                ],
            },
            {
                id: 3,
                name: 'Project 2',
                slug: 'project-2',
                item: {
                    content: 'project 2 content'
                }
            },
            {
                id: 4,
                name: 'Project 3',
                slug: 'project-3',
                item: {
                    content: 'project 3 content'
                }
            },
        ],
    },
    {
        id: 5,
        name: 'Inbox',
        slug: 'inbox',
        children: [
            {
                id: 6,
                name: 'Inbox 1',
                slug: 'inbox-1',
                item: {
                    content: 'inbox 1 content'
                }
            },
            {
                id: 7,
                name: 'Inbox 2',
                slug: 'inbox-2',
                item: {
                    content: 'inbox 2 content'
                }
            },
            {
                id: 8,
                name: 'Inbox 3',
                slug: 'inbox-3',
                item: {
                    content: 'inbox 3 content'
                }
            },

        ],
    },
] as ChunkType[];

function findNode (slug: string, currentNode: ChunkType) : ChunkType|boolean {
    var i,
        currentChild,
        result;

    if (slug == currentNode.slug) {
        return currentNode;
    } else {

        // Use a for loop instead of forEach to avoid nested functions
        // Otherwise "return" will not work properly
        for (i = 0; currentNode.children && i < currentNode.children.length; i += 1) {
            currentChild = currentNode.children[i];

            // Search in the current child
            result = findNode(slug, currentChild);

            // Return the result if the node has been found
            if (result !== false) {
                return result;
            }
        }

        // The node has not been found and we have no more options
        return false;
    }
}

export function findChunk(slug: string) {
    return findNode(slug, {
        children: data,
    } as ChunkType);
}