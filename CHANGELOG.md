# Changelog

All notable changes to the Salesforce Snippets Chrome Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-12

### Added
- Initial release of Salesforce Snippets Chrome Extension
- Context menu integration with hierarchical Japanese interface
- Field Level Security automation feature
- "Check All Allow Edit Access" functionality for Salesforce Profile settings
- Support for dynamic content loading with 2-second retry mechanism
- Cross-frame compatibility for Salesforce's iframe-based interface
- TypeScript implementation with Webpack bundling
- Manifest V3 compliance for Chrome extensions

### Technical Details
- Background service worker for menu management
- Content script for DOM manipulation
- Modular snippet architecture for easy extension
- Support for both static and dynamically loaded Salesforce content
- Comprehensive error handling and debug logging

### Browser Support
- Chrome (Manifest V3 compatible)
- Edge (Chromium-based)
- Other Chromium-based browsers

## [Unreleased]

### Planned Features
- Additional field-level security automation tools
- User permission management snippets
- Support for custom objects and fields
- Options page for configuration
- Keyboard shortcuts
- Bulk operations for multiple profiles
