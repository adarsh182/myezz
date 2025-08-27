# My Ezz Food Delivery Website

A single-brand food delivery startup website built with clean, minimal design principles.

## Project Structure

```
myezz-official-page/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── index.html       # Homepage
├── about.html      # About page
├── culture.html    # Culture & Values
├── investor.html   # Investor Relations
├── contact.html    # Contact page
└── legal.html      # Legal information
```

## Style Guide

### Colors
- Background: `#F8F7F5`
- Text: `#111315`
- Primary Accent: `#E23D28`
- Lines: `#E8E6E3`

### Typography
- Font Family: Inter
- Sizes:
  - H1: 56px/64px
  - H2: 40px/48px
  - Body: 16px/26px
  - Small: 14px/22px

### Spacing System
- 4px - Minimal spacing
- 8px - Small spacing
- 16px - Base spacing
- 24px - Medium spacing
- 32px - Large spacing
- 48px - Extra large spacing
- 64px - Maximum spacing

### Grid System
Desktop:
- 12 columns
- 72px margin
- 24px gutter

Mobile:
- 4 columns
- 16px margin

## Components

### Navigation
- Logo
- Page links
- CTA button
- Mobile-responsive menu

### Buttons
- Primary button
- Disabled state
- Hover effects

### Input Fields
- Default state
- Focus state
- Error state
- Form validation

### KPI Tiles
Used for displaying metrics and statistics
- Large number display
- Descriptive text
- Shadow and border styling

### Cards
Used for features, milestones, or stories
- Title
- Description
- Optional image
- Border and spacing

## CSS Variables

```css
:root {
  --bg: #F8F7F5;
  --text: #111315;
  --primary: #E23D28;
  --line: #E8E6E3;
  --font: 'Inter', Arial, sans-serif;

  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
}
```

## Responsive Design

The website is fully responsive with breakpoints at:
- Mobile: 420px
- Tablet: 768px
- Desktop: 1200px

### Mobile Adaptations
- Collapsible navigation menu
- Single column layout
- Adjusted typography scales
- Full-width buttons
- Stacked grid items
- Responsive spacing

## JavaScript Features

- Mobile menu functionality
- Form validation
- Interactive navigation
- Smooth animations
- Contact form handling

## Browser Support

The website is built using modern CSS features and is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

1. Clone the repository
2. Open any HTML file in a browser to view
3. Use Live Server for development

## CSS Architecture

The CSS is organized using:
- CSS Custom Properties (variables)
- Mobile-first responsive design
- BEM-like naming conventions
- Modular component styles

## Performance Considerations

- Minimal JavaScript usage
- Optimized assets
- Efficient CSS selectors
- Responsive images
- Cached resources

## Maintenance

To maintain consistency when making updates:
1. Follow the established color scheme
2. Use the defined spacing values
3. Maintain responsive design patterns
4. Follow component patterns
5. Update documentation as needed
