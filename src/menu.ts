const PAGE = chrome.contextMenus.ContextType.PAGE;

const contextMenus: ContextMenuItem = {
    "id": "sf_snippets",
    "title": "SF Snippets",
    "contexts": [PAGE],
    "children": [
        {
            "id": "settings",
            "title": "設定",
            "parentId": "sf_snippets",
            "contexts": [PAGE],
            "children": [
                {
                    "id": "profile",
                    "title": "プロファイル",
                    "parentId": "settings",
                    "contexts": [PAGE],
                    "children": [
                        {
                            "id": "field_level_security",
                            "title": "項目レベルセキュリティ",
                            "parentId": "profile",
                            "contexts": [PAGE],
                            "children": [
                                {
                                    "id": "check_all_allow_edit_access",
                                    "title": "「編集アクセス権」をすべてチェック",
                                    "parentId": "field_level_security",
                                    "contexts": [PAGE]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "custom_object",
                    "title": "カスタムオブジェクト",
                    "parentId": "settings",
                    "contexts": [PAGE],
                    "children": [
                        {
                            "id": "check_all_field_history",
                            "title": "「項目の履歴」をすべてチェック",
                            "parentId": "custom_object",
                            "contexts": [PAGE]
                        }
                    ]
                }
            ]
        }
    ]
}

export default function createContextMenus() {
    chrome.contextMenus.removeAll(() => {
        // Helper function to recursively create menu items
        function createMenuItem(item: ContextMenuItem, parentId?: string) {
            chrome.contextMenus.create({
                id: item.id,
                title: item.title,
                contexts: item.contexts as any,
                parentId: parentId
            });

            // Recursively create children if they exist
            if (item.children) {
                item.children.forEach(child => {
                    createMenuItem(child, item.id);
                });
            }
        }

        // Create the root menu and all its children recursively
        createMenuItem(contextMenus);
    });
}
