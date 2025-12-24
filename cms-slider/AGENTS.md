# CMS Slider Component

When working with the CMS Slider:

## Component Overview
A carousel slider that integrates with Webflow CMS collections, featuring React Slick and Shadow DOM styling.

## Key Features
- CMS Collection Integration: Extracts and displays items from Webflow CMS
- React Slick carousel with configurable options (autoplay, infinite loop, dots, arrows)
- Shadow DOM styling for proper style isolation in Webflow
- Slot-based content accepts Webflow CMS collection lists
- Customizable behavior (slides to show, scroll speed, autoplay settings)

## Development Guidelines
- Use React Slick for carousel functionality
- Implement Shadow DOM for style isolation
- Support slot-based content injection
- Handle CMS data extraction and display
- Use TypeScript for prop definitions

## Props Configuration
When imported into Webflow, configure these props:
- Autoplay settings
- Number of slides to show
- Scroll speed
- Dots and arrows visibility
- Infinite loop option

## File Structure
- src/components/: Slider and slide components
- src/hooks/: CMS data fetching hooks
- src/types/: CMS item type definitions
- src/styles/: Shadow DOM CSS styles

## Testing Notes
- Test with various CMS collection structures
- Verify carousel responsiveness
- Check slot content rendering
- Test autoplay and navigation features
- Validate Shadow DOM style isolation
