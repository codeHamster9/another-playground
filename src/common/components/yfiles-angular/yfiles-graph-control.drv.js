'use strict';

(function() {

  angular
    .module('ngbp')
    .directive('graphControl', function($compile, $filter, Layout, ScopeGraphSource, LevelOfDetailNodeStyle) {
      return {
        restrict: "AE",
        replace: false,
        // @yjs:keep
        scope: {
          'nodesSource': '=',
          'edgesSource': '=',
          'nodeIdBinding': '@',
          'sourceNodeBinding': '@',
          'targetNodeBinding': '@',
          'nodesFilter': '=',
          'currentNode': '='
        },

        link: function(scope, $element, attrs) {
          // create the GraphControl
          var graphControl = new yfiles.canvas.GraphControl();
          initializeGraphControl(graphControl);
          // and enable interaction
          initializeInputModes(graphControl);
          setupTooltips(graphControl, scope, $compile);

          // put GraphControl div in DOM
          var div = $element[0];
          if (div) {
            div.appendChild(graphControl.div);
            div.graphControl = graphControl;
          }

          // if a nodesSource is defined, initialize the graph
          if (scope.nodesSource) {
            var /**yfiles.binding.GraphSource*/ graphSource = new ScopeGraphSource(scope);
            // assign the bindings, if set
            if (scope.nodeIdBinding) {
              graphSource.nodeIdBinding = new yfiles.binding.Binding(scope.nodeIdBinding);
            }
            if (scope.sourceNodeBinding) {
              graphSource.sourceNodeBinding = new yfiles.binding.Binding(scope.sourceNodeBinding);
            }
            if (scope.targetNodeBinding) {
              graphSource.targetNodeBinding = new yfiles.binding.Binding(scope.targetNodeBinding);
            }

            graphSource.groupBinding = new yfiles.binding.Binding("position");

            graphSource.parentGroupBinding = new yfiles.binding.Binding("parent");
            // Identifies the id property of a group node object
            graphSource.groupIdBinding = new yfiles.binding.Binding("id");

            // initialize the graph defaults
            initializeGraphDefaults(graphSource.graph);

            var panelNodeStyle = new yfiles.drawing.PanelNodeStyle.WithColor(yfiles.system.Color.fromArgb(255, 214, 229, 248));
            panelNodeStyle.insets = new yfiles.geometry.InsetsD(20);
            graphSource.groupNodeDefaults.style = panelNodeStyle;

            // assign the nodes and edges source - filter the nodes
            graphSource.nodesSource = $filter('filter')(scope.nodesSource, 'position');
            if (scope.edgesSource) {
              graphSource.edgesSource = scope.edgesSource;
              graphSource.groupsSource = scope.groupsSource;
            }

            // build the graph from the source data
            graphControl.graph = graphSource.buildGraph();

            // calculate the initial layout
            Layout.doLayout(graphControl.graph);
            graphControl.fitGraphBounds();

            // update the graph if the nodesFilter has changed
            var inLayout = false;
            var modified = false;
            var updateGraph = function() {
              // prevent re-entrant layout
              if (!inLayout) {
                inLayout = true;
                // re-assign filtered nodesSource
                graphSource.nodesSource = $filter('filter')(scope.nodesSource, scope.nodesFilter);
                // update the graph
                graphSource.updateGraph();
                // refresh layout
                Layout.morphLayout(graphControl, function() {
                  inLayout = false;
                  if (modified) {
                    // call this method again if nodesSource was modified while in layout
                    modified = false;
                    updateGraph();
                  }
                });
              } else {
                // remember when we reach this code path when a layout is already running
                modified = true;
              }
            };

            // update the graph if the filter has changed
            scope.$watch("nodesFilter", function() {
              updateGraph();
            }, true);

          }
          // initialize the custom focus visualization
          initializeDecoration(graphControl.graph);

          // update the scope accordingly if the current item has changed
          graphControl.addCurrentItemChangedListener(function(sender, args) {
            var currentNode = graphControl.currentItem ? graphControl.currentItem.tag.item : null;
            if (scope.currentNode !== currentNode) {
              scope.$evalAsync(function() {
                scope.currentNode = currentNode;
              });
            }
          });

          // update the current item in the GraphControl if scope.currentNode has changed
          scope.$watch("currentNode", function(newValue) {
            // look for node with this tag
            var item = graphControl.graph.nodes.getFirstElementOrDefaultWithPredicate(function(n) {
              return n.tag.item === newValue;
            });
            // set it as currentItem
            graphControl.currentItem = item;
            if (item !== null) {
              // scroll the item into view
              graphControl.ensureVisible(item.layout.toRectD().getEnlarged(10));
            }
          });
        }
      };

      function initializeGraphControl(graphControl) {
        // always show the node focus
        graphControl.focusPaintManager.showFocusPolicy = yfiles.model.ShowFocusPolicy.ALWAYS;
      }

      function initializeInputModes(graphControl) {
        // create the input mode
        var inputMode = new yfiles.input.GraphViewerInputMode();
        inputMode.selectableItems = yfiles.graph.GraphItemTypes.NONE;
        graphControl.inputMode = inputMode;
      }

      function initializeDecoration(graph) {
        // customize the focus visualization
        var nodeDecorationInstaller = new yfiles.drawing.NodeStyleDecorationInstaller();
        nodeDecorationInstaller.nodeStyle = new yfiles.drawing.ShapeNodeStyle.WithShapePenAndBrush(
          yfiles.drawing.ShapeNodeShape.RECTANGLE,
          new yfiles.system.Pen.FromBrushAndThickness(yfiles.system.Brushes.GOLD, 3),
          yfiles.system.Brushes.TRANSPARENT);
        var decorator = graph.getDecorator();
        decorator.nodeDecorator.focusIndicatorDecorator.setImplementation(nodeDecorationInstaller);
      }

      function setupTooltips(graphControl, scope, compile) {
        // use an AngularJS template for the tooltip
        var template = "<div><div>{{item.name}}</div><div>{{item.position}}</div></div>";
        if (graphControl.inputMode instanceof yfiles.input.GraphViewerInputMode) {
          var inputMode = graphControl.inputMode;
          inputMode.toolTipItems = yfiles.graph.GraphItemTypes.NODE;
          inputMode.addQueryItemToolTipListener((function (src, eventArgs) {
            if (eventArgs.handled) {
              return;
            }
            var item = eventArgs.item;
            if (yfiles.graph.INode.isInstance(item)) {
              // create a new child scope
              var childScope = scope.$new();
              // assign the item to bind to
              childScope.item = item.tag.item;
              // compile the template
              var templateElement = compile(template)(childScope)[0];
              scope.$digest();
              // set the template element as the tooltip
              eventArgs.toolTip = templateElement;
              eventArgs.handled = true;
            }
          }).bind(this));
          // show the tooltip with a small offset
          inputMode.mouseHoverInputMode.toolTipLocationOffset = new yfiles.geometry.PointD(20, 20);
        }
      }

      function initializeGraphDefaults(graph) {
            // initialize the node and edge styles
            graph.nodeDefaults.style = new LevelOfDetailNodeStyle($compile, detailTemplate, intermediateTemplate,
                overviewTemplate);
            graph.nodeDefaults.size = new yfiles.geometry.SizeD(250, 100);

            var edgeStyle = new yfiles.drawing.PolylineEdgeStyle();
            edgeStyle.pen = new yfiles.system.Pen.FromBrushAndThickness(new yfiles.system.SolidColorBrush(
                yfiles.system.Color.fromArgb(255, 36, 154, 231)), 2);
            edgeStyle.targetArrow = yfiles.drawing.DefaultArrow.NONE;
            graph.edgeDefaults.style = edgeStyle;
      }
    });
})();
