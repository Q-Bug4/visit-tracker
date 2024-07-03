# Link History Checker

This Chrome extension provides the following features:

## Features

### 1. Display Visit History
When you hover over a link on any webpage, if the link has been visited before, a popup will display the last visit time and the number of visits.

### 2. Disable Sites
You can specify websites where the extension should not function. These sites can be added through the popup interface, and changes will take effect immediately.

### 3. Customize URL Transformation
Users can customize the URL transformation logic directly by modifying the `content.js` file. This allows advanced users to tailor the extension's behavior according to their needs.

## How to Use

1. **Display Visit History**: Simply hover over any link to see its visit history.
2. **Disable Sites**: Open the popup, add the websites (using regular expressions) to the disable list, and save. The extension will not work on these sites.
3. **Customize URL Transformation**: Open the `content.js` file and modify the `customTransform` function to customize how URLs are transformed. Example: `url => url.replace('http://', 'https://')`.
