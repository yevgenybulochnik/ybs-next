---
title: Medimap Lite
type: project
topic: programming
slug: medimap-lite
desc: Lite version of a fullstack project to visualize medicare costing data for various HCPCS Codes. Data for Oregon is embedded in the javascript bundle.
published: 10-27-2020
tags:
    - React
    - Python
    - Leafletjs
---
# Medimap Lite

### [Demo](https://yevgenybulochnik.com/medimap-lite)
This is an interesting project born out of a data set my brother showed me. The [data set](https://www.cms.gov/Research-Statistics-Data-and-Systems/Statistics-Trends-and-Reports/Medicare-Provider-Charge-Data/Physician-and-Other-Supplier2017), published by CMS, shows annualized charges and payments per NPI for HCPCS codes billed by various physicians and facilities. It has a mix of what appears to be facility fees and physician professional fees, with the most recent data coming from 2017.

My brother had a great idea, what if it was possible to geomap this dataset. How interesting would it be to see payment and reimbursement differences by geographical locations, or at the very least explore the data set with more an emphasis on location. Could this data be used to increase pricing transparency? How much do charges differ for the same HCPCS codes based on provider location? How much of a difference is there between what providers/facilities charge vs how much medicare reimburses?

#### Data Munging and Wrangling
---
This CMS dataset was one of the larger sets I have worked with. It was pleasantly surprising how easily (given enough ram) it was to manipulate using python and [pandas](https://pandas.pydata.org/docs/). Immediately, a few concerns came up. First many of the addresses assigned to NPI numbers were "programmatically" unique, but in reality were the same addresses. Some had an additional unit number or secondary street address for example. It would be unrealistic to geomap all 10 million records individually. A more sound approach would be to identify all unique addresses, geo tag those, then reassign them back so specific providers/facilities. A similar approach was used to map HCPCS codes to specific charges.

As I continued to explore the dataset, some more caveats became obvious. First, it appeared the charges are always associated with only one location. The location tied to the providers or facilities NPI number. If a provider, for example, worked at multiple locations the charges would all fall under whatever location that providers NPI number was registered at. Another concern, was what appeared to be a mix of professional fees and facility fees for some charges. In some cases it was easy to see the facility vs professional fee charge, in others it seemed like both were rolled into one.

In the end, I was able to parse the entire dataset and split out records based on states. I developed a custom python module to help me accomplish this.

#### Fun with Geotagging
---
The next setup was to figure out how to actually geotag all these locations. Most would reach for google maps geolocation api, but I found [geocodio](https://geocod.io) to be more hassle free. Their platform offered a free account (without providing credit card info) and allowed 2500 free geotags per day. To keep costs to a minimal, my custom python module accounts for this daily limit. For the state of oregon, there are over 4000 locations. The non-lite version of this project uses a cron job to geotag daily, keeping this limit in mind.

#### The Map
---
The actual map was built using [leafletjs](https://leafletjs.com/) and more specifically a React wrapper around leaflet called [React-Leaflet](https://react-leaflet.js.org/). This coupled with [blueprintjs](https://blueprintjs.com/docs/#select/suggest) suggest component to create a searchable drop down for HCPCS codes. I'm a huge fan of [React-Table](https://react-table.tanstack.com/docs/overview) and its hook based approach, so it drives all the tables in the application.

#### The Bundle
---
The final js bundle for this application includes a fairly large dataset embedded in it. This was done deliberately as a way to host the project on github pages without the need to host an api as well. As this is the "lite" version of this project, it only includes the state of Oregon and the most frequently charged HCPCS codes. Surprisingly, chrome can handle as much as 60k records simply stored in the browser. There are noticeable performance hits with this approach, specifically with the "9921" HCPCS codes.

#### Conclusions
---
Overall, this was a very fun project to work on. Both the full version which includes a full api + frontend and this lite version. The dataset itself is very intriguing, especially when comparing charges vs medicare reimbursement rates. Its interesting to see the wide variation of charges for a given HCPCS code with the juxtaposition of a largely flat medicare reimbursement rate. It begs many questions around cost, cost transparency and reimbursement in general.
