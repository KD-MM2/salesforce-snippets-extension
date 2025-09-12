# Salesforce Snippets Chrome Extension

A Chrome extension that provides quick automation tools for Salesforce Lightning platform.

## Features

### Current Functionality

- **Field Level Security Automation**: Automatically check all "Allow Edit Access" checkboxes in Salesforce Profile Field Level Security settings
- **Context Menu Integration**: Easy access through right-click context menu with Japanese interface
- **Dynamic Content Support**: Works with both static and dynamically loaded Salesforce content
- **Cross-frame Compatibility**: Handles Salesforce's iframe-based interface structure

### Menu Structure

The extension adds a hierarchical context menu:
```
SF Snippets
└── 設定 (Settings)
    └── プロファイル (Profile)
        └── 項目レベルセキュリティ (Field Level Security)
            └── 「編集アクセス権」をすべてチェック (Check All Allow Edit Access)
```

## Installation

### Development Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd SFSnippets
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Build the extension:
   ```bash
   pnpm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

### Production Build

To create a production build:
```bash
pnpm run build
```

For development with automatic rebuilding:
```bash
pnpm run watch
```

## Use case
For example:
- You have a Custom object with 100+ custom fields which need to enable Row-level access permissions.
- You want to quickly check all "Allow Edit Access" checkboxes for these fields without doing it manually.
- You need a reliable way to automate this process across different profiles and objects.

![Usage Example](./assets/usage_example.gif)

## Technical Details

### Architecture

- **Manifest V3**: Uses the latest Chrome extension manifest version
- **TypeScript**: Written entirely in TypeScript for better type safety
- **Webpack**: Bundled using Webpack with TypeScript loader
- **Service Worker**: Uses background service worker for menu creation and message handling

### File Structure

```
src/
├── background.ts         # Service worker for extension lifecycle
├── content.ts            # Content script for DOM manipulation
├── menu.ts               # Context menu definitions
├── types.d.ts            # TypeScript type definitions
├── manifest.json         # Extension manifest
└── snippets/
    └── settings/
        └── profile/
            └── field_level_security/
                └── check_all_allow_edit_access.ts
```

### Key Components

- **Background Script**: Manages context menu creation and message routing
- **Content Script**: Executes DOM manipulation on Salesforce pages
- **Menu System**: Hierarchical context menu with Japanese localization
- **Snippet Modules**: Modular automation functions for specific Salesforce tasks

## Development

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- Chrome browser for testing

### Adding New Snippets

1. Create a new TypeScript file in the appropriate `snippets/` subdirectory
2. Export a default function that performs the desired automation
3. Add the menu item to `menu.ts`
4. Add the message handler in `background.ts`
5. Add the message listener case in `content.ts`

### Build Scripts

- `pnpm run build`: Create production build
- `pnpm run watch`: Development build with file watching
- `pnpm test`: Run tests (currently not implemented)

## Browser Compatibility

- Chrome (Manifest V3 compatible)
- Edge (Chromium-based)
- Other Chromium-based browsers

## Permissions

The extension requires the following permissions:
- `contextMenus`: For adding right-click menu items
- `scripting`: For injecting content scripts
- `activeTab`: For accessing the current active tab

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License - See LICENSE file for details

## Troubleshooting

### Common Issues

1. **Extension not working on Salesforce pages**
   - Ensure you're on a Salesforce Lightning page
   - Check that the extension is enabled in Chrome
   - Verify the content script is loading in Developer Tools

2. **Context menu not appearing**
   - Right-click on the page content, not on empty space
   - Ensure the extension has proper permissions

### Debug Mode

Enable debug logging by opening Chrome Developer Tools and checking the Console tab for detailed execution logs.
