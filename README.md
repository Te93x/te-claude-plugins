# Te's Claude Plugins

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of custom plugins for Claude AI, designed to enhance productivity and manage usage efficiently.

## 🚀 Quick Start

1. **Add this marketplace to Claude:**

   ```
   /plugin marketplace add Te93x/te-claude-plugins
   ```

2. **Install plugins:**

   ```
   /plugin install glm-peak-guard@te-claude-plugins
   ```

3. **Reload Plugins**

   ```
   /reload-plugins
   ```

4. Disable the plugin if you want to use Claude during peak hours (reload required to apply changes):
   ```
   /plugin disable glm-peak-guard
   ```

## 📦 Available Plugins

### [GLM Peak Guard](./plugins/glm-peak-guard/)

Automatically blocks Claude usage during peak hours (06:00-10:00 UTC) when GLM models consume 3× quota. Helps preserve your GLM Coding Plan by preventing expensive usage periods.

**Key Features:**

- 🛡️ Automatic blocking during peak hours
- 🕒 Smart timezone display
- 💰 Saves GLM Coding Plan quota
- 🔄 Fail-safe design

[📖 Full Documentation](./plugins/glm-peak-guard/README.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
