---
title: HRSA Findings Dashboard
type: project
topic: programming
slug: hrsa-findings-dashboard
desc: This fullstack project uses flask as an api and React for the frontend. Data is scraped from HRSA, manipulated and fed into a filterable dashboard
published: 9-17-2020
tags:
    - FullStack
    - Python
    - Flask
    - React
    - Scrapy
---
# HRSA Findings Dashboard

### [Demo](https://yevgenybulochnik.com/hrsa-findings-dashboard)
This project really came out of my completion of the [340B ACE](https://www.apexus.com/340b-certificate-program) certification. After completing the program, immediately my mind went to finding data and outcomes related to audits. As it turns out the [Health Resources and Services Administration](https://www.hrsa.gov/), otherwise known as HRSA, publishes some of its national audit findings.

#### HRSA Program Integrity
---
HRSA 340B program findings are periodically updated [here](https://www.hrsa.gov/opa/program-integrity/index.html). The findings are split out by year, and available in the right sidebar under a section called **Audits of Covered Entity Results**. Each page of findings contains a single HTML table with data associated with the respective entity's audit.

<img src="https://assets.yevgenybulochnik.com/hrsa_findings_table.png" width="100%">

You may already see some issues with the way this is setup. For example, how about these questions:
- How many audits happen yearly?
- How many audits have been completed in general over time?
- How often are there actually findings as a result of an audit?
- What are the most common findings?
- How frequently do audits occur in my state?

With how this data is being presented, these seemingly basic questions are actually fairly difficult to answer. Moreover, one might think a simple copy paste into an excel document, plus a pivot table would do the trick. This, however, produces some erroneous rows occasionally. Not to mention it requires quite a bit of manual data munging.

#### The Beauty in Automation
---
From the start I wanted to create an automated solution for data collection, data munging and data processing. Enter the amazing open source python web crawler [Scrapy](https://scrapy.org/). Using scrapy's built in [Items](https://docs.scrapy.org/en/latest/topics/items.html), [Itemloaders](https://docs.scrapy.org/en/latest/topics/loaders.html) and [Pipelines](https://docs.scrapy.org/en/latest/topics/item-pipeline.html) creating more structured data was a breeze. Also, scrapy provided a method for cleaning up the sometimes unstructured html table tags. Below is the example code used to scrape elements from those tables.

```python
for row in table_rows:
    il = ItemLoader(item=HrsafindingsItem(), selector=row)
    il.add_value('year', Path(response.request.url).stem)
    il.add_xpath('entity', './/th/text()')
    il.add_xpath('entity', './/th/child::*')
    il.add_xpath('hrsa_id', './/td[1]/text()')
    il.add_xpath('hrsa_id', './/td[1]/child::*')
    il.add_xpath('state', './/td[2]/text()')
    il.add_xpath('state', './/td[2]/child::*')
    il.add_xpath('opa_findings', './/td[3]/text()')
    il.add_xpath('opa_findings', './/td[3]/child::*')
    il.add_xpath('sanction', './/td[4]')
    il.add_xpath('cap_status', './/td[5]/text()')
    il.add_xpath('cap_status', './/td[5]/child::*')
    il.add_xpath('entity_contact', './/td[6]')
    yield il.load_item()
```
To get around some of the funny HTML structure, calls to the same item keys, `opa_findings` for example, are used to concatenate text used in multiple HTML elements. This is necessary due to some of the table rows having sometimes hidden characters or unexpected HTML tags which are not immediately obvious to the naked eye.

In addition, custom functions were used to further sanitize the data, including regular expressions to "tag" each record based on finding type for better filtering. An example of a parsed row is below:

```json
{
    "year": "fy-20-results",
    "entity": "Ascension Seton DBA Ascension Seton Medical Center Austin",
    "hrsa_id": "DSH450056",
    "state": "TX",
    "opa_findings": "No adverse findings",
    "sanction": "None",
    "cap_status": "N/A--Audit closure date: April 29, 2020",
    "entity_contact": "",
    "full_year": "2020",
    "entity_abv": "DSH",
    "closure_date": "April 29, 2020",
    "tags": "no_findings"
}
```

With all this a single command `scrapy crawl findings_spider`, will automatically find all the HRSA Program Integrity HTML tables, parse all those tables, and clean up that data to get a single structured json file.

#### The Rest-API
---
The next step was to make this data easily consumable. I decided to use [Flask](https://flask.palletsprojects.com) and a serialization library called [Marshmallow](https://marshmallow.readthedocs.io) to build out a simple rest api. It was necessary to create quite a few custom query parameters to help filtering the data, so [WebArgs](https://webargs.readthedocs.io) seemed like a logical addition. The api hosts 4 endpoints.

| Endpoint          | Method | Query Params                                                                |
| ---               | ---    | ---                                                                         |
| /records          | Get    | states, hrsa_designations, years, findings_keywords, entity_keywords, tags  |
| /filteritems      | Get    | None                                                                        |
| /summary          | Get    | states, hrsa_designations                                                   |
| /summary/findings | Get    | states, hrsa_designations, years                                            |

As you can imagine the records endpoint provides a list of audit rows, with the option to filter by specific query parameters. Filteritems are a unique list of states, hrsa designations, tags and years to feed the frontend auto suggest inputs. This way as you type in the filters, an automated suggestion gets displayed. The last two endpoints provide summary data using groupby queries.

#### The Dashboard
---
Lastly, the dashboard itself was built using [Typescript](https://www.typescriptlang.org) and [React](https://reactjs.org). [Blueprintjs](https://blueprintjs.com/docs/) was used a component library along with [React-Table](https://github.com/tannerlinsley/react-table) to make a custom display table for audit records. The dashboard was bootstrapped with [Create-React-App](https://github.com/facebook/create-react-app), otherwise known as CRA.

My intent with the dashboard was to have two separate pages. One that would just show aggregate summary data, ie the [overview](https://yevgenybulochnik.com/hrsa-findings-dashboard) page, while the [other](https://yevgenybulochnik.com/hrsa-findings-dashboard/explore) would show more granular data with additional filter options. I decided to use [Redux](https://redux.js.org/) and [Redux-Saga](https://redux-saga.js.org/) for application state management. The other piece that is unique to the frontend code was allowing the dashboard to be built with the option of using the API or for the data to actually be embedded. This "modular" data setup allows me to serve the application using github pages, with the option to deploy  with the API if necessary using environmental variables.

#### Conclusions
---
This project was really a testament to what the combination of pharmacy domain knowledge plus programming knowledge can produce. Now one may think, well this could be created using excel and tableau! However, when considering this took one developer (myself) maybe a week to produce, leverages free open sources tools and is served publicly for free, it becomes easier to see the value. Not to mention, data processing through data visualization is automated.

Overall, this project was very fun and interesting to work on. My hope is the dashboard itself can be used to gain better insight into the 340B Program while also drumming up interest for pharmacists to get into programming!
