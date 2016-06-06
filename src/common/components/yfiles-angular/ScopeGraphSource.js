/****************************************************************************
 **
 ** This demo file is part of yFiles for HTML 1.2.1.4.
 ** Copyright (c) 2000-2015 by yWorks GmbH, Vor dem Kreuzberg 28,
 ** 72070 Tuebingen, Germany. All rights reserved.
 **
 ** yFiles demo files exhibit yFiles for HTML functionalities. Any redistribution
 ** of demo files in source code or binary form, with or without
 ** modification, is not permitted.
 **
 ** Owners of a valid software license for a yFiles for HTML version that this
 ** demo is shipped with are allowed to use the demo source code as basis
 ** for their own yFiles for HTML powered applications. Use of such programs is
 ** governed by the rights and conditions as set out in the yFiles for HTML
 ** license agreement.
 **
 ** THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESS OR IMPLIED
 ** WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 ** MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN
 ** NO EVENT SHALL yWorks BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 ** SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 ** TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 ** PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 ** LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 ** NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 ** SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 **
 ***************************************************************************/
(typeof define == 'function' ? define : (function(dependencies, fn) { fn(); }))(['vendor/yfiles/lib/yfiles/lang'], function() {
  yfiles.module("demo", function(exports) {

    /**
     * This is a modified GraphSource that stores a child scope of the given scope in each node's tag.
     *
     * By default, GraphSource stores the business data object that corresponds to a node in the node's tag. For this
     * demo, we want to store a scope object instead (and store the data as item of the scope). Therefore, the methods
     * the deal with the creation and updating of nodes and groups are overridden to implement this behavior.
     */
    exports.ScopeGraphSource = new yfiles.ClassDefinition(function() {

      return {
        '$extends': yfiles.binding.GraphSource,

        'constructor': function(scope) {
          yfiles.binding.GraphSource.call(this);
          this.scope = scope;
        },

        'createNode': function(groupedGraph, parent, location, labelData, data) {
          // call the super method
          var node = demo.ScopeGraphSource.$super.createNode.call(this, groupedGraph, parent, location, labelData, data);
          // create a new child scope
          var childScope = this.scope.$new(false);
          // assign the business data
          childScope.item = data;
          // put the child scope in the node's tag
          node.tag = childScope;
          return node;
        },

        'createGroupNode': function(groupedGraph, data) {
          // call the super method
          var node = demo.ScopeGraphSource.$super.createGroupNode.call(this, groupedGraph, data);
          // create a new child scope
          var childScope = this.scope.$new(false);
          // assign the business data
          childScope.item = data;
          // put the child scope in the node's tag
          node.tag = childScope;
          return node;
        },

        'updateNode': function(groupedGraph, node, parent, location, labelData, data) {
          // get the scope from the node's tag
          var scope = node.tag;
          // call the super method (replaces 'the' tag with the data)
          demo.ScopeGraphSource.$super.updateNode.call(this, groupedGraph, node, parent, location, labelData, data);
          // assign the business data
          scope.item = data;
          node.tag = scope;
        },

        'updateGroupNode': function(groupedGraph, groupNode, data) {
          // get the scope from the node's tag
          var scope = groupNode.tag;
          // call the super method (replaces the 'tag' with the data)
          demo.ScopeGraphSource.$super.updateGroupNode.call(this, groupedGraph, groupNode, data);
          // assign the business data
          scope.item = data;
          groupNode.tag = scope;
        }
      };
    });

    exports.ScopeTreeSource = new yfiles.ClassDefinition(function() {

      return {
        '$extends': yfiles.binding.TreeSource,

        'constructor': function(scope) {
          yfiles.binding.TreeSource.call(this);
          this.scope = scope;
        },

        'createNode': function(graph, sourceNode, targetNode, labelData) {
          // call the super method
          var node = demo.ScopeTreeSource.$super.createNode.call(this, graph, sourceNode, targetNode, labelData);
          // create a new child scope
          var childScope = this.scope.$new(false);
          // assign the business data
          childScope.item = labelData;
          // put the child scope in the node's tag
          node.tag = childScope;
          return node;
        },

        'updateNode': function(graph, node, nodeItem) {
          // get the scope from the node's tag
          var scope = node.tag;
          // call the super method (replaces 'the' tag with the data)
          demo.ScopeTreeSource.$super.updateNode.call(this, graph, node, nodeItem);
          // assign the business data
          scope.item = node;
          node.tag = scope;
        }

      };
    });

  });
});
