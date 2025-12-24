# Store Locator Component

When working with the Store Locator:

## Component Overview
A map component with backend API that plots locations, demonstrating Webflow Cloud integration, JWT authentication, and CMS API usage.

## Key Features
- Webflow Cloud backend for secure API calls
- JWT authentication for protected content access
- Webflow CMS API integration for location data
- Mapbox integration for mapping capabilities
- Leaflet.js for lightweight, open-source mapping

## Development Guidelines
- Set up Webflow Cloud for backend services
- Implement JWT token handling
- Use Webflow CMS API for location data
- Integrate Mapbox for map tiles and geolocation
- Use Leaflet.js for interactive maps

## Props Configuration
When imported into Webflow, configure these props:
- JWT token for authentication
- Mapbox API key
- Default map center coordinates
- Zoom level settings
- Location filter options

## File Structure
- src/components/: Map and location components
- src/api/: Webflow CMS API calls
- src/auth/: JWT handling utilities
- src/utils/: Geolocation helpers

## Testing Notes
- Test JWT authentication flow
- Verify location data retrieval
- Check map rendering and interaction
- Test search and filter functionality
- Validate responsive map behavior
