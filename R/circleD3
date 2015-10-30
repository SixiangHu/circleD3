#' circleD3
#'
#' create the d3 circle pack nested plot.
#'
#' @import htmlwidgets
#'
#' @export circleD3
circleD3 <- function(data, width = 650, height = 565,radius = 500) {

  # forward options using x
  xx = list(
    data = data,
    radius = radius
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'circleD3',
    xx,
    width = width,
    height = height,
    package = 'circleD3'
  )
}

#' Shiny bindings for circleD3
#'
#' Output and render functions for using circleD3 within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a circleD3
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name circleD3-shiny
#'
#' @export circleD3Output
circleD3Output <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'circleD3', width, height, package = 'circleD3')
}

#' @rdname circleD3-shiny
#' @export renderCircleD3
renderCircleD3 <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, circleD3Output, env, quoted = TRUE)
}
