---
title: "README"
author: "Sixiang Hu"
date: "30 October 2015"
output: html_document
---

This is a R package that visulises dataset or models using `d3` javascript library.

Currently, the following `d3` plots have been implemented, and more to add in:
- Circle pack nested plot (`circleD3` function).  The original idea is from http://bl.ocks.org/billdwhite/7207695
- Parsets plot (`parsetsD3` function).  The original idea is from https://www.jasondavies.com/parallel-sets/

This package is based on `htmlwidgets` package, hence can be used in `Shiny` app.

It utilises `d3-tip` javascript library for tooltip.

```{r}
library(circleD3)

data <- list(id =1,
                 name = "flare",
                 children = list(
                   list(
                     id=2,
                     name="analytics",
                     size=100
                   ),
                   list(
                     id=3,
                     name="AgglomerativeCluster",
                     children = list(
                       list(
                         id=4,
                          name="MergeEdge",
                         children =list(
                           list(id=6,
                                name="AAA",
                                size=100),
                           list(id=7,
                                name="BBB",
                                size=150),
                           list(id=8,
                                name="CCC",
                                size=100)
                         )
                         ),
                       list(
                         id=5,
                          name="CommunityStructure",
                          size=200
                         )
                     )
                   )
                   )
    )

circleD3(data)

```

To install the package from github

```{r, eval=FALSE}
devtools::install_github('SixiangHu/circleD3')
```

Thanks `d3` and `htmlwidgets` for brilliant packages that this plot is built on.
