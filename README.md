# frontend-prototype
### KPI NETWORK
Develop a frontend prototype for a new website.

Use [React](https://reactjs.org/) to develop a frontend prototype for a new website, for routing use the wouter, and fetching data use axios.

````yml
    src:
        - main.jsx
        - App.jsx
        - App.scss
        components:
            Card:
            - Header.jsx
        assets:
            - kpi.svg
        hooks:
            - useUniverseOverview.jsx
        services:
            - universeOverview.js
        views:
            CopanyView:
            ComparisionView:
            UniverseView:
                - universeOverview.jsx
````