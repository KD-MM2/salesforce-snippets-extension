interface ContextMenuItem {
    id: string;
    title: string;
    contexts: string[];
    parentId?: string;
    children?: ContextMenuItem[];
}
