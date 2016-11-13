/****************************************************************************
 **
 ** This demo file is part of yFiles for HTML 1.3.0.3.
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
(function() {
  angular
    .module('ngbp.yfiles')
    .factory('ScopeGraphSource', function() {
      return ScopeGraphSource;
    });

  var ScopeGraphSource = yfiles.lang.Class('ScopeGraphSource', {
    $extends: yfiles.binding.GraphSource,
    constructor: function(scope) {
     yfiles.binding.GraphSource.call(this);
     this.scope = scope;
   },
    'createNode': function (groupedGraph, parent, location, labelData, data) {
        // call the super method
        var node = ScopeGraphSource.$super.createNode.call(this, groupedGraph, parent, location, labelData, data);
        // create a new child scope
        var childScope = this.scope.$new(false);
        // assign the business data
        childScope.item = data;
        // put the child scope in the node's tag
        node.tag = childScope;
        return node;
      },

      'createGroupNode': function (groupedGraph, data) {
        // call the super method
        var node = ScopeGraphSource.$super.createGroupNode.call(this, groupedGraph, data);
        // create a new child scope
        var childScope = this.scope.$new(false);
        // assign the business data
        childScope.item = data;
        // put the child scope in the node's tag
        node.tag = childScope;
        return node;
      },

      'updateNode': function (groupedGraph, node, parent, location, labelData, data) {
        // get the scope from the node's tag
        var scope = node.tag;
        // call the super method (replaces 'the' tag with the data)
        ScopeGraphSource.$super.updateNode.call(this, groupedGraph, node, parent, location, labelData, data);
        // assign the business data
        scope.item = data;
        node.tag = scope;
      },

      'updateGroupNode': function (groupedGraph, groupNode, data) {
        // get the scope from the node's tag
        var scope = groupNode.tag;
        // call the super method (replaces the 'tag' with the data)
        ScopeGraphSource.$super.updateGroupNode.call(this, groupedGraph, groupNode, data);
        // assign the business data
        scope.item = data;
        groupNode.tag = scope;
      }
  });
})();
