'use strict';

(function() {

  angular
    .module('ngbp')
    .directive('graphControl', function($compile, $filter, Layout) {

      return {
        restrict: "AE",
        replace: false,
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

          var TOGGLE_CHILDREN_COMMAND,self;

          function loaded() {
            self.$initGraphCollapseDemo();

            var div = $element[0];
            if (div) {
              div.appendChild(self.graphControl.div);
              div.graphControl = self.graphControl;
            }
          }

          self = {
            'collapsedNodes': null,

            /**
             * graph that contains visible nodes
             * @type {yfiles.graph.FilteredGraphWrapper}
             * @private
             */
            'filteredGraph': null,

            /**
             * graph containing all nodes
             * @type {yfiles.graph.DefaultGraph}
             * @private
             */
            'fullGraph': null,

            /**
             * style that uses the specified svg snippet as a template for the node.
             * @type {yfiles.drawing.INodeStyle}
             * @private
             */
            'leafNodeStyle': null,

            /**
             * currently selected layouter
             * @type {yfiles.layout.ILayouter}
             * @private
             */
            'currentLayouter': null,

            /**
             * list of all layouters
             * @type {yfiles.collections.List.<yfiles.layout.ILayouter>}
             * @private
             */
            'layoutersField': null,

            /**
             * mapper for mapping layouters to their string representation in the combobox
             * @type {yfiles.model.IMapper.<string,yfiles.layout.ILayouter>}
             * @private
             */
            'layouterMapper': null,

            /**
             * the node that has just been toggled and should stay fixed.
             * @type {yfiles.graph.INode}
             * @private
             */
            'toggledNode': null,

            /**
             * Returns all available layouters.
             * @type {yfiles.collections.List.<yfiles.layout.ILayouter>}
             */
            'layouters': {
              'get': function() {
                return self.layoutersField;
              }
            },

            /** @type {yfiles.canvas.GraphControl} */
            'graphControl': null,

            /** @type {demo.IComboBox} */
            'layoutChooserBox': null,

            'registerCommands': function() {
              self.setProperty("FitContent", new demo.ApplicationCommand(yfiles.canvas.GraphControl.FIT_GRAPH_BOUNDS_COMMAND, self.graphControl));
              self.setProperty("ZoomIn", new demo.ApplicationCommand(yfiles.system.NavigationCommands.INCREASE_ZOOM, self.graphControl));
              self.setProperty("ZoomOut", new demo.ApplicationCommand(yfiles.system.NavigationCommands.DECREASE_ZOOM, self.graphControl));
              var newApplicationCommand = new demo.ApplicationCommand(yfiles.system.NavigationCommands.ZOOM, self.graphControl);
              newApplicationCommand.parameter = 1.0;
              self.setProperty("ZoomOriginal", newApplicationCommand);
              self.setProperty("SelectLayout", new demo.ActionCommand((function() {
                self.currentLayouter = self.layouterMapper.getItem(self.layoutChooserBox.selectedItem);
                self.runLayout(true);
              }).bind(self)));
            },

            // #region Handling Expand/Collapse Clicks

            /**
             * Called when the ToggleChildren command has been executed.
             * Toggles the visibility of the node's children.
             */
            'toggleChildrenExecuted': function(sender, /**yfiles.system.ExecutedRoutedEventArgs*/ e) {
              var param = e.parameter;
              var item = param !== null ? param : self.graphControl.currentItem;
              if (yfiles.graph.INode.isInstance(item)) {
                var canExpand = self.filteredGraph.outDegree(( /**@type {yfiles.graph.INode}*/ (item))) !== self.filteredGraph.fullGraph.outDegree(( /**@type {yfiles.graph.INode}*/ (item)));
                if (canExpand) {
                  self.expand(( /**@type {yfiles.graph.INode}*/ (item)));
                } else {
                  self.collapse(( /**@type {yfiles.graph.INode}*/ (item)));
                }
              }
            },

            /**
             * Show the children of a collapsed node.
             * @param {yfiles.graph.INode} node The node that should be expanded
             * @private
             */
            'expand': function( /**yfiles.graph.INode*/ node) {
              if (self.collapsedNodes.contains(node)) {
                self.toggledNode = node;
                setCollapsedTag(node, false);
                self.alignChildren(node);
                self.collapsedNodes.remove(node);
                self.filteredGraph.nodePredicateChanged();
                self.runLayout(false);
              }
            },

            /**
             * Hide the children of a expanded node.
             * @param {yfiles.graph.INode} node The node that should be collapsed
             * @private
             */
            'collapse': function( /**yfiles.graph.INode*/ node) {
              if (!self.collapsedNodes.contains(node)) {
                self.toggledNode = node;
                setCollapsedTag(node, true);
                self.collapsedNodes.add(node);
                self.filteredGraph.nodePredicateChanged();
                self.runLayout(false);
              }
            },

            /**
             * Sets the initial positions of the children of a node which gets expanded
             * to the position of the expanded node. self looks nicer in the following
             * animated layout. Try commenting out the method body to see the
             * difference.
             * @private
             */
            'alignChildren': function( /**yfiles.graph.INode*/ node) {
              var center = node.layout.getRectangleCenter();
              self.fullGraph.edgesAtOwner(node).forEach((function( /**yfiles.graph.IEdge*/ edge) {
                if (edge.sourcePort.owner === node) {
                  self.fullGraph.clearBends(edge);
                  var child = ( /**@type {yfiles.graph.INode}*/ (edge.targetPort.owner));
                  self.fullGraph.setCenter(child, center);
                  self.alignChildren(child);
                }
              }).bind(self));
            },

            // #endregion Handling Expand/Collapse Clicks

            /**
             * Builds a sample graph.
             * @private
             */
            'buildTree': function( /**yfiles.graph.IGraph*/ graph, /**number*/ children, /**number*/ levels, /**number*/ collapseLevel) {
              var root = graph.createNodeWithCenter(new yfiles.geometry.PointD(20, 20));
              setCollapsedTag(root, false);
              self.addChildren(levels, graph, root, children, collapseLevel);
              self.graphControl.invalidate();
            },

            /**
             * @type {yfiles.system.Random}
             * @private
             */
            'random': null,

            /**
             * Recursively add children to the tree.
             * @private
             */
            'addChildren': function( /**number*/ level, /**yfiles.graph.IGraph*/ graph, /**yfiles.graph.INode*/ root, /**number*/ childCount, /**number*/ collapseLevel) {
              var actualChildCount = self.random.nextIntInRange(1, childCount + 1);
              for (var i = 0; i < actualChildCount; i++) {
                var child = graph.createNodeWithCenter(new yfiles.geometry.PointD(20, 20));
                graph.createEdge(root, child);
                if (level < collapseLevel) {
                  self.collapsedNodes.add(child);
                  setCollapsedTag(child, true);
                } else {
                  setCollapsedTag(child, false);
                }
                if (level > 0) {
                  self.addChildren(level - 1, graph, child, 4, 2);
                } else {
                  graph.setNodeStyle(child, self.leafNodeStyle);
                }
              }
            },

            /**
             * Returns <code>true</code> for any edge.
             * @return {boolean}
             * @private
             */
            'edgePredicate': function( /**yfiles.graph.IEdge*/ obj) {
              return true;
            },

            /**
             * Predicate for the filtered graph wrapper that
             * indicates whether a node should be visible.
             * @return {boolean}  true if the node should be visible
             * @private
             */
            'nodePredicate': function( /**yfiles.graph.INode*/ node) {
              // return true if none of the parent nodes is collapsed
              var edge = self.fullGraph.inEdgesAt(node).getFirstElementOrDefault();
              if (edge !== null) {
                var parent = ( /**@type {yfiles.graph.INode}*/ (edge.sourcePort.owner));
                return !self.collapsedNodes.contains(parent) && self.nodePredicate(parent);
              }
              return true;
            },

            // #region Initialization

            /**
             * Initializes the graph instance, setting default styles
             * and creating a small sample graph.
             */
            'initializeGraph': function() {
              // Create a new style that uses the specified svg snippet as a template for the node.
              self.leafNodeStyle = new yfiles.drawing.TemplateNodeStyle.WithKey("LeafNodeStyleTemplate");
              // Create the graph instance that will hold the complete graph.
              self.fullGraph = new yfiles.graph.DefaultGraph();

              // create a new style that uses the specified svg snippet as a template for the node.
              self.fullGraph.nodeDefaults.style = new yfiles.drawing.TemplateNodeStyle.WithKey("InnerNodeStyleTemplate");
              self.fullGraph.nodeDefaults.size = new yfiles.geometry.SizeD(60, 30);
              self.fullGraph.nodeDefaults.shareStyleInstance = false;

              // and a style for the labels
              var labelStyle = new yfiles.drawing.SimpleLabelStyle();
              self.fullGraph.nodeDefaults.labels.style = labelStyle;
              // require('./demos/co');

              // now build a simple sample tree
              self.buildTree(self.fullGraph, 3, 3, 3);

              // create a view of the graph that contains only non-collapsed subtrees.
              // use a predicate method to decide what nodes should be part of the graph.
              self.filteredGraph = new yfiles.graph.FilteredGraphWrapper(self.fullGraph, yfiles.lang.delegate(self.nodePredicate, self), yfiles.lang.delegate(self.edgePredicate, self));

              // display the filtered graph in our control.
              self.graphControl.graph = self.filteredGraph;
            },

            /**
             * Creates a mode and registers it as the
             * {@link yfiles.canvas.CanvasControl#inputMode}.
             */
            'initializeInputModes': function() {
              // Create a viewer input mode and register callbacks for item clicks
              var graphViewerInputMode = new yfiles.input.GraphViewerInputMode();
              graphViewerInputMode.selectableItems = yfiles.graph.GraphItemTypes.NONE;
              graphViewerInputMode.clickableItems = yfiles.graph.GraphItemTypes.NODE;
              graphViewerInputMode.addItemClickedListener((function(sender, /**yfiles.support.ItemInputEventArgs.<yfiles.model.IModelItem>*/ args) {
                if (yfiles.graph.INode.isInstance(args.item)) {
                  // toggle the collapsed state of the clicked node
                  TOGGLE_CHILDREN_COMMAND.executeOnTarget(args.item, self.graphControl);
                }
              }).bind(self));
              self.graphControl.inputMode = graphViewerInputMode;

              self.graphControl.selectionPaintManager.enabled = false;
              self.graphControl.focusPaintManager.enabled = false;
              self.graphControl.highlightPaintManager.enabled = false;
            },

            // #endregion Initialization

            /** @private */
            'setupLayouters': function() {
              // add a mapper for the FocusNodeStage
              self.filteredGraph.mapperRegistry.addMapperWithTagAndGetter(yfiles.graph.INode.$class, yfiles.lang.Boolean.$class, yfiles.layout.FixNodeLayoutStage.FIXED_NODE_DP_KEY, (function( /**yfiles.graph.INode*/ node) {
                return node === self.toggledNode;
              }).bind(self));

              // create TreeLayouter
              var treeLayouter = new yfiles.tree.TreeLayouter();
              treeLayouter.comparator = new yfiles.tree.XCoordComparator();
              treeLayouter.layoutOrientation = yfiles.layout.LayoutOrientation.LEFT_TO_RIGHT;
              treeLayouter.layoutStyle = yfiles.tree.EdgeLayoutStyle.ORTHOGONAL;

              treeLayouter.prependStage(new yfiles.layout.FixNodeLayoutStage());

              // self.layoutChooserBox.items = yfiles.collections.List.fromArray(["Tree", "Balloon", "Organic", "Generic Tree"]);

              // set it as initial value
              self.layoutersField.add(treeLayouter);
              self.layouterMapper.setItem("Tree", treeLayouter);

              // create BalloonLayouter
              var balloonLayouter = new yfiles.tree.BalloonLayouter();
              balloonLayouter.fromSketchMode = true;
              balloonLayouter.compactnessFactor = 1.0;
              balloonLayouter.allowOverlaps = true;

              balloonLayouter.prependStage(new yfiles.layout.FixNodeLayoutStage());
              self.layoutersField.add(balloonLayouter);
              self.layouterMapper.setItem("Balloon", balloonLayouter);

              // create OrganicLayouter
              var organicLayouter = new yfiles.organic.OrganicLayouter();
              organicLayouter.initialPlacement = yfiles.organic.InitialPlacement.AS_IS;
              organicLayouter.iterationFactor = 8;

              organicLayouter.prependStage(new yfiles.layout.FixNodeLayoutStage());
              self.layoutersField.add(organicLayouter);
              self.layouterMapper.setItem("Organic", organicLayouter);

              // create GenericLayouter
              var genericTreeLayouter = new yfiles.tree.GenericTreeLayouter();
              genericTreeLayouter.prependStage(new yfiles.layout.FixNodeLayoutStage());
              self.layoutersField.add(genericTreeLayouter);
              self.layouterMapper.setItem("Generic Tree", genericTreeLayouter);

              self.currentLayouter = genericTreeLayouter;

            },

            /**
             * indicates whether a layout is currently in calculation
             * @type {boolean}
             * @private
             */
            'runningLayout': false,

            /** @private */
            'runLayout': function( /**boolean*/ animateViewport) {
              if (self.currentLayouter !== null && !self.runningLayout) {
                self.runningLayout = true;
                var newLayoutExecutor = new yfiles.graph.LayoutExecutor.FromControlAndLayouter(self.graphControl, self.currentLayouter);
                newLayoutExecutor.updateContentRect = true;
                newLayoutExecutor.animateViewport = animateViewport;
                newLayoutExecutor.duration = yfiles.system.TimeSpan.fromSeconds(0.3);
                newLayoutExecutor.finishHandler = (function(sender, /**yfiles.system.EventArgs*/ args) {
                  self.runningLayout = false;
                  self.toggledNode = null;
                  if (args instanceof yfiles.graph.LayoutExceptionEventArgs) {
                    var exception = (( /**@type {yfiles.graph.LayoutExceptionEventArgs}*/ (args))).exception;
                    console.log(exception.message, 0);
                  }
                }).bind(self);
                newLayoutExecutor.start();
              }
            },

            /** @see Overrides {@link demo.Application#loaded} */
            'loaded': function() {
              // self.graphControl.commandBindings.add(new yfiles.system.CommandBinding.WithCommandAndHandler(TOGGLE_CHILDREN_COMMAND, yfiles.lang.delegate(self.toggleChildrenExecuted, self)));
                yfiles.lang.delegate(self.initializeInputModes, self);
                self.initializeGraph();
                self.setupLayouters();
                self.runLayout(true);

            },

            /** @private */
            '$initGraphCollapseDemo': function() {
              self.collapsedNodes = new yfiles.collections.List /**.<yfiles.graph.INode>*/ ();
              self.layoutersField = new yfiles.collections.List /**.<yfiles.layout.ILayouter>*/ ();
              self.layouterMapper = new yfiles.model.DictionaryMapper /**.<string, yfiles.layout.ILayouter>*/ ();
              self.random = new yfiles.system.Random.WithSeed(666);
              self.graphControl = new yfiles.canvas.GraphControl();
              self.$clinit();
              self.loaded();
            },

            '$clinit': function() {
              TOGGLE_CHILDREN_COMMAND = new yfiles.system.RoutedUICommand.FromNameTypeAndInputGestures("Toggle Children", "ToggleChildren", self);
            }
          };

          /**
           * Stores the collapsed state of the node in the style tag in order
           * to be able to bind to it using a template binding.
           */
          function setCollapsedTag( /**yfiles.graph.INode*/ node, /**boolean*/ collapsed) {
            if (node.style instanceof yfiles.drawing.TemplateNodeStyle) {
              (( /**@type {yfiles.drawing.TemplateNodeStyle}*/ (node.style))).styleTag = collapsed;
            }
          }
         loaded();
        }
      };
    });
})();
