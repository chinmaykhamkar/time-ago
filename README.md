# ⏰ timeago-format

A lightweight, zero-dependency TypeScript library for formatting timestamps into human-readable "time ago" strings.

[![npm version](https://badge.fury.io/js/timeago-format.svg)](https://www.npmjs.com/package/timeago-format)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🚀 **Zero dependencies** - Lightweight and fast
- 🔧 **TypeScript first** - Full type safety out of the box
- 🎯 **Simple API** - Just one function, multiple input types
- ⚡ **Performance focused** - Optimized for speed
- 🌍 **Future-ready** - Optional future date handling
- 📝 **Well tested** - Comprehensive test coverage

## 📦 Installation

```bash
npm install timeago-format
```

```bash
yarn add timeago-format
```

```bash
pnpm add timeago-format
```

## 🚀 Quick Start

```typescript
import { timeAgo } from 'timeago-format';

// Basic usage
console.log(timeAgo(new Date(Date.now() - 30000))); // "30s ago"
console.log(timeAgo(new Date(Date.now() - 300000))); // "5m ago"
console.log(timeAgo(new Date(Date.now() - 3600000))); // "1h ago"

// Works with different input types
console.log(timeAgo(Date.now() - 30000)); // timestamp
console.log(timeAgo('2024-01-15T10:30:00Z')); // ISO string
console.log(timeAgo(new Date('2024-01-15'))); // Date object
```

## 🔧 Setup for Different Module Systems

### ES Modules (Modern JavaScript/TypeScript)
This is the default and recommended approach:

```typescript
import { timeAgo } from 'timeago-format';
```

### CommonJS (Node.js with require)
If you want to use `require()` syntax, ensure your project is set up for CommonJS:

1. **Make sure your `package.json` doesn't have `"type": "module"`** (or set it to `"type": "commonjs"`)
2. **Use `.js` file extensions** (not `.mjs`)
3. **Use require syntax**:

```javascript
const { timeAgo } = require('timeago-format');

// Usage is exactly the same
console.log(timeAgo(new Date(Date.now() - 30000))); // "30s ago"
```

### Project Setup Example for CommonJS

Create a new project with CommonJS support:

```bash
# Create project directory
mkdir my-timeago-project
cd my-timeago-project

# Initialize package.json (ensure no "type": "module")
npm init -y

# Install the package
npm install timeago-format

# Create a test file (test.js)
echo 'const { timeAgo } = require("timeago-format");
console.log(timeAgo(new Date(Date.now() - 30000)));' > test.js

# Run the test
node test.js
```

## 📖 API Reference

### `timeAgo(input, options?)`

Formats a date/timestamp into a human-readable "time ago" string.

#### Parameters

- **`input`** (`Date | string | number`) - The date to format
- **`options`** (`TimeAgoOptions`) - Optional configuration

#### Returns

`string` - Formatted time string

#### Options

```typescript
interface TimeAgoOptions {
  referenceDate?: Date;     // Custom reference date (default: now)
  includeFuture?: boolean;  // Handle future dates with "in X" format
}
```

## 📋 Format Rules

| Time Range | Format | Example |
|------------|--------|---------|
| < 1 second | `Just now` | Just now |
| 1-59 seconds | `Ns ago` | 30s ago |
| 1-59 minutes | `Nm ago` | 5m ago |
| 1-23 hours | `Nh ago` | 3h ago |
| 24+ hours (same year) | `Month Day` | May 30 |
| 24+ hours (different year) | `Month Day, Year` | Dec 12, 2024 |

## 💡 Usage Examples

### Basic Time Intervals

```typescript
import { timeAgo } from 'timeago-format';

const now = new Date();

// Just now
timeAgo(new Date(now.getTime() - 500)); // "Just now"

// Seconds
timeAgo(new Date(now.getTime() - 30000)); // "30s ago"

// Minutes  
timeAgo(new Date(now.getTime() - 300000)); // "5m ago"

// Hours
timeAgo(new Date(now.getTime() - 7200000)); // "2h ago"
```

### Date Formatting

```typescript
// Same year dates
timeAgo(new Date('2025-03-15')); // "Mar 15" (if current year is 2025)

// Different year dates  
timeAgo(new Date('2024-12-25')); // "Dec 25, 2024"
timeAgo(new Date('2026-07-04')); // "Jul 4, 2026"
```

### Custom Reference Date

```typescript
const customRef = new Date('2025-06-01T12:00:00Z');

timeAgo(new Date('2025-06-01T11:30:00Z'), { 
  referenceDate: customRef 
}); // "30m ago"
```

### Future Dates

```typescript
const future = new Date(Date.now() + 3600000); // +1 hour

// Default behavior - shows as date
timeAgo(future); // "Jun 1" or "Jun 1, 2025"

// With future handling enabled
timeAgo(future, { includeFuture: true }); // "in 1h"
```

### Input Types

```typescript
// Date object
timeAgo(new Date('2024-01-15T10:30:00Z'));

// Timestamp (number)
timeAgo(1705314600000);

// ISO string
timeAgo('2024-01-15T10:30:00.000Z');

// Date string
timeAgo('Jan 15, 2024');
```

## 🧪 Error Handling

```typescript
try {
  timeAgo('invalid-date');
} catch (error) {
  console.error(error.message); // "Invalid date input: invalid-date"
}

// Type-safe with TypeScript
timeAgo(null); // ❌ TypeScript error
timeAgo(undefined); // ❌ TypeScript error
```

## 🏗️ TypeScript Support

Full TypeScript support with exported types:

```typescript
import { timeAgo, DateInput, TimeAgoOptions } from 'timeago-format';

const input: DateInput = new Date();
const options: TimeAgoOptions = { 
  referenceDate: new Date(),
  includeFuture: true 
};

const result: string = timeAgo(input, options);
```

## 🔧 Module System Compatibility

```javascript
// CommonJS (Node.js)
const { timeAgo } = require('timeago-format');

// ES Modules (Modern JavaScript/TypeScript)
import { timeAgo } from 'timeago-format';

// Default export
import timeAgo from 'timeago-format';

// Dynamic import (ES2020+)
const { timeAgo } = await import('timeago-format');
```

## 🎯 Use Cases

- **Social media feeds** - Show post timestamps
- **Chat applications** - Message time indicators  
- **Activity logs** - Track user actions
- **Comment systems** - Display comment ages
- **File managers** - Show file modification times
- **Analytics dashboards** - Time-based data visualization

## 🏃 Performance

- **Zero dependencies** - No external libs to slow you down
- **Lightweight** - < 2KB minified + gzipped
- **Fast calculations** - Optimized date arithmetic
- **Tree-shakable** - Import only what you need

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

[MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

## 🌟 Why timeago-format?

- **Simple & focused** - Does one thing really well
- **TypeScript native** - Built with TS from the ground up
- **Zero dependencies** - No bloat, just functionality
- **Well tested** - Comprehensive test coverage
- **Modern API** - Clean, intuitive interface 