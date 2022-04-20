# Manual tests

After each deploy it is recommended to verify in the interface that everything is working correctly. The cases to be considered are detailed below.

## Content

- [Universe Overview](#universe-overview)
  - [Year selection](#year-selection)
  - [Bubble chart](#bubble-chart)
  - [Information cards](#information-cards)
  - [Peer group Analysis](#peer-group-analysis)
- [Company Report vs Peers](#company-report-vs-peers)
  - [Year selection](#year-selection-1)
  - [Company selection](#company-selection)
  - [Bubble chart](#rule-of-40-chart)
  - [Description card](#description-card)
  - [Financial profile card](#company-financial-profile)
  - [Peer group Analysis](#peer-group-analysis-table)
- [Filters](#filters)
  - [General Behavior](#general-behavior-of-the-filters)
  - [Behavior on Universe Overview](#behavior-of-filters-on-universe-overview)
  - [Behavior on Company report vs peers](#behavior-of-filters-on-company-report-vs-peers)
- [Admin Panel](#admin-panel)
  - [Users](#users)
  - [Companies](#companies)
  - [Upload File](#upload-file)
- [About us](#about-us)

## Universe Overview

### Year Selection

- All elements on the Universe Overview screen should change when the year is changed.
- The selected year on this screen should also be applied on the 'Company report vs peers' screen.

### Bubble chart

#### Admin user

As an administrator user, when hovering over the graph bubbles, the company name, the revenue growth and the Ebitda margin must be displayed.

#### Customer user

As a customer user, when hovering over the graph bubbles, the company name should be displayed with the anonymization nomenclature (nnnn-xxxx). The revenue growth and ebitda margin values ​​must be shown.

#### No data provided

When there is no data the graph does not show the bubbles.

### Information Cards

This screen shows five cards with general information of all the companies entered in the system.

1. KPI Averages: the values ​​in this table change according to the year. When there is no information the values ​​change to 0. Filters are also applied to this table.
2. Count By Size: the values ​​in this table change according to the year. When there is no information the table shows 'No rows'. When there is no data for a specific row, the row is not displayed. Filters are also applied to this table.
3. Growth and margin by size; recent actuals: this table works like the 'Count by size' table.
4. Revenue & ebitda vs budget: this table works like the 'Count by size' table.
5. Growth and margin by size; projected: this table works like the 'Count by size' table.

### Peer group analysis

#### Admin user

The table must be displayed without anonymized data. In other words, the names of the companies must be displayed and the values ​​in the 'Revenue' column must not be displayed in the range.

#### Customer user

The table should be displayed with anonymized data if the user does not have permissions. That is, the names of the companies to which the user has permission should be displayed, but the companies to which the user does not have permission should be displayed anonymized (nnnn-xxxx). The same case applies to revenue. If the user has permission to the companies the revenue must be shown otherwise only a range will be shown.

#### No data provided

If there is no value in the table, 'NA' is displayed.

#### Download csv

The option to download the table in csv should work with the filters applied and the year specified

## Company Report vs Peers

### Year selection

It should work like the [year selection in Universe Overview](#year-selection)

### Company selection

When selecting a company, the company description table and financial profile table must be loaded with that company's information.
The peer analysis group table should also be loaded when the company is selected and should show the selected company information in the first row.

#### Admin user

In the select option, if the user is an administrator, all the companies with public data must appear.

#### Customer user

If the user has a customer role, then only the companies to which the user has permission should appear in the list of companies.

### Rule of 40 chart

It should work like the [buble chart in Universe Overview](#bubble-chart)

### Description card

In case there is no company information, 'NA' should appear

### Company financial profile

In case there is no company information, 'NA' should appear

### Peer Group Analysis Table

It should work like the [Peer group anaylisis table in Universe Overview](#peer-group-analysis), the difference is that the information of the selected company is shown in the first row of the table.



## Filters

### General behavior of the filters

- The filters applied to one screen must be applied to the others, that is, if a sector filter is applied in the Universe overview screen with the value of 'Computer Hardware' and if we go to the Company report vs. Peers page, the same filter must be applied.
- Filters accept multiple options. Example: You can select to show only companies with a sector of 'Computer Hardware' and 'Online Media' and with a negative growth profile

### Behavior of filters on Universe Overview

- Rule of 40: filters must be applied to the bubble chart, where each bubble represents a company.
- KPI Averages: the values ​​in this table should change when a filter is applied.
- Count By Size: If a filter is applied and there are no more companies within the company size range, then the row does not appear in the table.
- Growth and margin by size; recent actuals and Revenue & ebitda vs budget: These tables should behave like table Count By Size when a filter is applied.
- Peer Group Analysis:  Although in this table only the vertical, the sector and the name can be observed as descriptive information of the company, all the filters must still be applied to this table. In the case of applying sector and vertical filters, it is possible to validate the operation in the table by observing that only companies with the applied filters should appear.

### Behavior of filters on Company Report vs Peers

- Company selection: filters do not apply to this list of companies.
- Rule of 40: filters must be applied to the bubble chart. The companies (bubbles) should appear according to the filter.
- Description and company financial profile cards: these cards depend on the selected company regardless of the filtered values. For example, if we select a company with vertical 'Application Software' and apply a filter so that only companies with vertical 'Online Media' appear, the information should still be displayed.
- Peer Group Analysis: In this case, if the selected company does not comply with the filtered data, then it will not be shown in the table.

## Admin Panel

The administration panel should only appear to users with administrator role

### Users

- In the users option, a column table must be loaded: email and role. Each user should only have one role and the emails should be listed in alphabetical order.
- When a user is clicked, the user's information should be shown at the top of the page and two tabs should be shown at the bottom: permissions and roles.
- In the permissions tab, a table must be loaded with the companies to which the user has permission and the type of permission.
- In the permissions tab, if you click on the 'add permissions' option, a table with the public access companies must be loaded. If you want to add or remove permissions, you can check or uncheck the boxes and click save, in this case the table is reloaded with the new permissions. In case of putting cancel the table must remain unchanged. The table must apply pagination.

### Companies

- In the companies option, a table must be loaded with company information and a checkbox that indicates whether the company is publicly accessible. The table must apply pagination.
- If you want to change whether the company is publicly accessible, you can click on 'change publicly' to be able to check or uncheck the boxes and click save, in this case the table is reloaded with the new changes. In case of putting cancel the table must remain unchanged.

### Upload File

- In this section you can drag a csv file into the square or click to upload a file from your computer.
- If the file does not have a .csv extension, a message should appear indicating why the file cannot be processed. If the extension is correct, the uploaded file and its size will be displayed. To upload the file, click the 'upload data' button

## About us

The about us option should redirect the user to the KPI Network landing page.
- [Landing page KPI Network](https://www.kpinetwork.com)
- [Demo landing page](https://demo.kpinetwork.com)