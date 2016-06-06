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
(typeof define=='function'?define:(function(dependencies, fn){fn();}))(['vendor/yfiles/lib/yfiles/lang'],function(){
yfiles.module("demo", function(exports) {

  exports.LevelOfDetailNodeStyle = new yfiles.ClassDefinition(function() {

    return {
      '$extends': yfiles.drawing.SimpleAbstractNodeStyle,

      'constructor': function($compile, detailTemplate, intermediateTemplate, overviewTemplate) {
        yfiles.drawing.SimpleAbstractNodeStyle.call(this, yfiles.drawing.DefaultVisual.$class);
        this.$compile = $compile;

        // Stores the templates used to render the node at different zoom levels
        this.templates = [detailTemplate, intermediateTemplate, overviewTemplate];

        // The zoom value thresholds for switching the templates
        this.detailThreshold = 0.7;
        this.intermediateThreshold = 0.4;
      },

      'createVisual': function(/**yfiles.graph.INode*/ node, /**yfiles.drawing.IRenderContext*/ renderContext) {
        // get scope previously stored in node tag at node creation
        var scope = node.tag;

        if (!scope) {
          return null;
        }

        var zoom = renderContext.zoom;
        // find out which template to use
        var templateMode = this.getTemplateMode(zoom);
        // wrap template in svg element, compile and digest scope
        var template = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + this.templates[templateMode] + '</svg>';
        var templateElement = this.$compile(template)(scope)[0];
        scope.$digest();

        // create a container holding all elements
        var g = window.document.createElementNS("http://www.w3.org/2000/svg", "g");
        // transform it to node location
        g.setAttributeNS(null, "transform", "translate(" + node.layout.x + " " + node.layout.y + ")");
        g.appendChild(templateElement.firstChild);

        // remember template mode for updating
        g["data-templateMode"] = templateMode;

        // return new visual with container
        return new yfiles.drawing.DefaultVisual(g);
      },

      'updateVisual': function(/**yfiles.graph.INode*/ node, /**yfiles.drawing.IRenderContext*/  renderContext,
                                /**yfiles.drawing.DefaultVisual*/ oldVisual) {
        if (oldVisual && oldVisual.svgElement) {
          var g = oldVisual.svgElement;
          var oldTemplateMode = g["data-templateMode"];
          var zoom = renderContext.zoom;
          var newTemplateMode = this.getTemplateMode(zoom);
          // if template mode did not change
          if (oldTemplateMode === newTemplateMode) {
            // update the element's location
            g.setAttributeNS(null, "transform", "translate(" + node.layout.x + " " + node.layout.y + ")");
            return oldVisual;
          }
        }
        // otherwise, re-create the visual
        return this.createVisual(node, renderContext);
      },

      'getTemplateMode': function(zoom) {
        return zoom > this.detailThreshold ? 0 : zoom > this.intermediateThreshold ? 1 : 2;
      }
    };
  })


});});
