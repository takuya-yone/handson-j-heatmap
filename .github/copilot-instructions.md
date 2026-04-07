# Copilot Instructions

## Project

`handson-j-heatmap` — a hands-on workshop template for building a heatmap visualization of Japanese prefecture data.

## 🎯 Workshop Purpose

**This is a GitHub Copilot CLI hands-on workshop.** The goal is NOT to have participants write code manually, but to learn how to effectively use GitHub Copilot CLI to generate code and build a complete visualization application.

## ⚠️ Workshop Template - Implementation Guidelines

**Participants are expected to create `index.html` by leveraging GitHub Copilot CLI.**

### DO:
- **Support code generation** - Help participants generate code using Copilot CLI
- **Provide complete, working code** when asked through Copilot CLI
- **Generate full implementations** for features and components
- **Explain the generated code** - Help participants understand what was generated and why
- **Describe D3.js APIs** and methods being used in the generated code
- **Debug and fix issues** in generated or participant's code
- **Suggest improvements** to generated code
- **Guide effective prompting** - Help participants write better prompts for Copilot CLI

### DO NOT:
- **Refuse to generate code** - This defeats the purpose of the Copilot CLI workshop
- **Generate code without explanation** - Always explain what the code does



## Project Structure

```
handson-j-heatmap/
├── index.html            # Workshop task - participants create this (DO NOT CREATE)
├── data/
│   └── population.json   # Prefecture population data (1970-2023)
└── src/                  # Optional resources
```

## Architecture

### Data Files

**`data/population.json`**
- Historical population data for 47 Japanese prefectures
- Census years: 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2023
- Structure: `{ "2023": [{id: "01", name: "北海道", population: 5140000}, ...], ... }`
- Source: e-Stat (Portal Site of Official Statistics of Japan), National Census

## Key Technologies

- **D3.js v7** - Data visualization library
- **GeoJSON** - Geographic data format for Japan map
- **Vanilla JavaScript** - No framework dependencies
- **SVG** - Scalable Vector Graphics for rendering

## Workshop Learning Objectives

Participants will learn to:
1. Load and parse JSON data using D3.js
2. Create SVG-based geographic visualizations
3. Map data to visual properties (color scales)
4. Handle user interactions (year selection)
5. Work with GeoJSON geographic data
6. Build responsive data visualizations

## Guidance Principles

When participants ask for help:
1. **Generate working code** - Provide complete, functional implementations via Copilot CLI
2. **Explain the generated code** - Describe what each part does and why
3. **Teach effective prompting** - Help participants write better prompts for Copilot CLI
4. **Reference documentation** - Point to relevant D3.js docs or examples for deeper understanding
5. **Iterate and improve** - Help refine and enhance generated code

## Example Responses

❌ **Bad** (refuses to help):
"I can't provide the complete implementation. You should figure it out yourself."

✅ **Good** (provides code with explanation):
"Here's a complete implementation for loading the population data:

```javascript
d3.json("data/population.json").then(data => {
  // data is an object with years as keys
  const currentYear = "2023";
  const prefectures = data[currentYear];
  console.log(prefectures); // Array of 47 prefectures
});
```

This code:
1. Uses `d3.json()` to load the JSON file asynchronously
2. Returns a Promise, so we use `.then()` to handle the data
3. Extracts the 2023 year data as an example
4. Logs it to the console so you can see the structure

You can then use this data to color-code the map based on population values."

## Testing

Since this is a static HTML project with embedded data and CDN resources, no build system or local server is required. Participants can simply double-click `index.html` to open it in a web browser.

## Common Workshop Issues

- **D3.js version mismatches**: Ensure using D3.js v7 from CDN (e.g., `https://d3js.org/d3.v7.min.js`)
- **GeoJSON and data loading**: Use `d3.json()` to load both `data/population.json` and Japan GeoJSON from CDN
- **Relative paths**: Make sure `data/population.json` path is correct relative to `index.html`
- **Data structure confusion**: Encourage using browser DevTools to inspect loaded data
