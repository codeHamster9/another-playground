/**
 * Provides the graph layout as a service.
 * Code taken from demo.yfiles.graph.OrgChart.
 */

(function() {
  'use strict';
  angular
    .module('ngbp')
    .factory('Layout', function() {
      return {
        '$inLayout': false,
        'treeLayout': createTreeLayout(),
        'hierarchicLayout': createHierarchicLayout(),

        'configureLayout': function( /**yfiles.graph.IGraph*/ tree) {
          var /**yfiles.graph.IMapperRegistry*/ registry = tree.mapperRegistry;

          var /**yfiles.model.DictionaryMapper.<yfiles.graph.INode, yfiles.tree.INodePlacer>*/ nodePlacerMapper =
            registry.addDictionaryMapper(yfiles.graph.INode.$class, yfiles.tree.INodePlacer.$class,
              yfiles.tree.GenericTreeLayouter.NODE_PLACER_DP_KEY);
          var /**yfiles.model.DictionaryMapper.<yfiles.graph.INode, boolean>*/ assistantMapper =
            registry.addDictionaryMapper(yfiles.graph.INode.$class, yfiles.lang.Boolean.$class,
              yfiles.tree.AssistantPlacer.ASSISTANT_DP_KEY);

          tree.nodes.forEach((function( /**yfiles.graph.INode*/ node) {
            if (tree.inDegree(node) === 0) {
              setNodePlacers(node, nodePlacerMapper, assistantMapper, tree);
            }
          }).bind(this));
        },

        'cleanUp': function( /**yfiles.graph.IGraph*/ graph) {
          var /**yfiles.graph.IMapperRegistry*/ registry = graph.mapperRegistry;
          registry.removeMapper(yfiles.tree.AssistantPlacer.ASSISTANT_DP_KEY);
          registry.removeMapper(yfiles.tree.GenericTreeLayouter.NODE_PLACER_DP_KEY);
        },

        'doLayout': function(graph) {
            this.hierarchicLayout.applyLayout(graph);
          // if (this.canTreeLayout(graph)) {
          //   this.configureLayout(graph);
          //   this.treeLayout.applyLayout(graph);
          //   this.cleanUp(graph);
          // } else {
          // }
        },

        'morphLayout': function(graphControl, callback) {
          // if (this.canTreeLayout(graphControl.graph)) {
          //   this.configureLayout(graphControl.graph);
          //   graphControl.morphLayout(this.treeLayout, yfiles.system.TimeSpan.fromMilliseconds(500), callback);
          //   this.cleanUp(graphControl.graph);
          // } else {
            graphControl.morphLayout(this.hierarchicLayout, yfiles.system.TimeSpan.fromMilliseconds(500), callback);
          // }
        },

        /**
         * Checks whether the given graph can be used with tree layout
         */
        'canTreeLayout': function(graph) {
          var /**yfiles.graph.LayoutGraphAdapter*/ adapter = new yfiles.graph.LayoutGraphAdapter.ForGraph(graph);
          var copiedLayoutGraph = new yfiles.layout.CopiedLayoutGraph.FromGraphAndLayout(adapter, adapter);
          return this.treeLayout.canLayoutCore(copiedLayoutGraph);
        }
      };

      function setNodePlacers(rootNode, nodePlacerMapper, assistantMapper, tree) {
        var employee = rootNode.tag.item;
        if (employee !== null) {
          var /**string*/ layout = employee.layout;
          switch (layout) {
            case "rightHanging":
              var /**yfiles.tree.DefaultNodePlacer*/ newDefaultNodePlacer =
                new yfiles.tree.DefaultNodePlacer.WithAlignmentAndDistance(
                  yfiles.tree.ChildPlacement.VERTICAL_TO_RIGHT, yfiles.tree.RootAlignment.LEADING_ON_BUS, 30, 30);
              newDefaultNodePlacer.routingStyle = yfiles.tree.RoutingStyle.FORK_AT_ROOT;
              nodePlacerMapper.setItem(rootNode, newDefaultNodePlacer);
              break;
            case "leftHanging":
              var /**yfiles.tree.DefaultNodePlacer*/ newDefaultNodePlacer1 =
                new yfiles.tree.DefaultNodePlacer.WithAlignmentAndDistance(
                  yfiles.tree.ChildPlacement.VERTICAL_TO_LEFT, yfiles.tree.RootAlignment.LEADING_ON_BUS, 30, 30);
              newDefaultNodePlacer1.routingStyle = yfiles.tree.RoutingStyle.FORK_AT_ROOT;
              nodePlacerMapper.setItem(rootNode, newDefaultNodePlacer1);
              break;
            case "bothHanging":
              var /**yfiles.tree.LeftRightPlacer*/ newLeftRightPlacer = new yfiles.tree.LeftRightPlacer();
              newLeftRightPlacer.placeLastOnBottom = false;
              nodePlacerMapper.setItem(rootNode, newLeftRightPlacer);
              break;
            default:
              nodePlacerMapper.setItem(rootNode, new yfiles.tree.DefaultNodePlacer.WithAlignmentAndDistance(
                yfiles.tree.ChildPlacement.HORIZONTAL_DOWNWARD, yfiles.tree.RootAlignment.MEDIAN, 30, 30));
              break;
          }

          var /**boolean*/ assistant = employee.assistant;
          if (assistant && tree.inDegree(rootNode) > 0) {
            var /**yfiles.graph.IEdge*/ inEdge = tree.inEdgesAt(rootNode).getItem(0);
            var /**yfiles.graph.INode*/ parent = inEdge.getSourceNode();
            var /**yfiles.tree.INodePlacer*/ oldParentPlacer = nodePlacerMapper.getItem(parent);
            var /**yfiles.tree.AssistantPlacer*/ assistantPlacer = new yfiles.tree.AssistantPlacer();
            assistantPlacer.childNodePlacer = oldParentPlacer;
            nodePlacerMapper.setItem(parent, assistantPlacer);
            assistantMapper.setItem(rootNode, true);
          }
        }

        tree.outEdgesAt(rootNode).forEach((function( /**yfiles.graph.IEdge*/ outEdge) {
          var /**yfiles.graph.INode*/ child = ( /**@type {yfiles.graph.INode}*/ (outEdge.targetPort.owner));
          setNodePlacers(child, nodePlacerMapper, assistantMapper, tree);
        }).bind(this));
      }

      function createTreeLayout() {
        var gtl = new yfiles.tree.GenericTreeLayouter();
        var /**yfiles.tree.TreeReductionStage*/ treeReductionStage = new yfiles.tree.TreeReductionStage();
        treeReductionStage.nonTreeEdgeRouter = new yfiles.router.OrganicEdgeRouter();
        treeReductionStage.nonTreeEdgeSelectionKey = yfiles.router.OrganicEdgeRouter.ROUTE_EDGE_DP_KEY;

        gtl.appendStage(treeReductionStage);
        return gtl;
      }

      function createHierarchicLayout() {
        return new yfiles.hierarchic.IncrementalHierarchicLayouter();
      }

    });
})();
