# GLM Peak Guard Plugin

A Claude plugin that automatically blocks usage during peak hours (06:00-10:00 UTC) to help preserve your GLM Coding Plan quota.

## Features

- **Automatic Blocking**: Prevents prompts during peak hours when GLM models consume 3× quota
- **Smart Timezone Display**: Shows peak hours in your local timezone for clarity
- **Fail-Safe**: If anything goes wrong, the plugin fails open (allows prompts)
- **User-Friendly Messages**: Clear explanations of why usage is blocked and when to try again

## Installation

1. **Add the marketplace to Claude:**
   ```
   /plugin marketplace add Te93x/te-claude-plugins
   ```

2. **Install GLM Peak Guard:**
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

## How It Works

The plugin hooks into Claude's prompt submission process and checks the current UTC time. During peak hours (06:00-10:00 UTC), it displays a helpful message explaining the block and suggests waiting until off-peak hours.

Peak hours correspond to when GLM-5.1 and GLM-5-Turbo models consume 3× the normal quota, making it much more expensive to use Claude during these times.

## Configuration

No configuration is required. The plugin uses fixed peak hours of 06:00-10:00 UTC, which are the standard peak hours for GLM model quota consumption.

## License

MIT License - see LICENSE file in the repository root.