#' parsetsD3
#'
#' parsets D3 plot in R
#'
#' @import htmlwidgets
#'
#' @export
parsetsD3 <- function(data,dim, width = NULL, height = NULL) {

  # forward options using x
  x = list(
    data = data,
    dim = dim
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'parsetsD3',
    x,
    width = width,
    height = height,
    package = 'circleD3'
  )
}

#' Shiny bindings for parsetsD3
#'
#' Output and render functions for using parsetsD3 within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a parsetsD3
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name parsetsD3-shiny
#'
#' @export
parsetsD3Output <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'parsetsD3', width, height, package = 'circleD3')
}

#' @rdname parsetsD3-shiny
#' @export
renderParsetsD3 <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, parsetsD3Output, env, quoted = TRUE)
}
