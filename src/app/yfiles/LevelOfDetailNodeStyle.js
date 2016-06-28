/****************************************************************************
 **
 ** This demo
 file is part of yFiles for HTML 1.3.0.3.
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
    .module('ngbp')
    .factory('LevelOfDetailNodeStyle', function($templateCache) {

      return yfiles.lang.Class('LevelOfDetailNodeStyle', {
        $extends: yfiles.drawing.SimpleAbstractNodeStyle,
        constructor: function($compile, detailTemplate, intermediateTemplate, overviewTemplate) {
          yfiles.drawing.SimpleAbstractNodeStyle.call(this, yfiles.drawing.DefaultVisual.$class), this.$compile = $compile, this.templates = [detailTemplate, intermediateTemplate, overviewTemplate], this.detailThreshold = 0.7, this.intermediateThreshold = 0.4
        },
        createVisual: function(node, renderContext) {
          var scope = node.tag;
          if (scope.item.position === 'Instance') {
            var detailTpl = $templateCache.get('components/yfiles-angular/resources/templates/ronud-detail-node.tpl.html');
            this.templates[0] = detailTpl;
          }

          if (!scope) return null;
          var zoom = renderContext.zoom,
            templateMode = this.getTemplateMode(zoom),
            template = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + this.templates[templateMode] + '</svg>',
            templateElement = this.$compile(template)(scope)[0];
          scope.$digest();
          var g = window.document.createElementNS('http://www.w3.org/2000/svg', 'g');
          return g.setAttributeNS(null, 'transform', 'translate(' + node.layout.x + ' ' + node.layout.y + ')'), g.appendChild(templateElement.firstChild), g['data-templateMode'] = templateMode, new yfiles.drawing.DefaultVisual(g)
        },
        updateVisual: function(node, renderContext, oldVisual) {
          if (oldVisual && oldVisual.svgElement) {
            var g = oldVisual.svgElement,
              oldTemplateMode = g['data-templateMode'],
              zoom = renderContext.zoom,
              newTemplateMode = this.getTemplateMode(zoom);
            if (oldTemplateMode === newTemplateMode) return g.setAttributeNS(null, 'transform', 'translate(' + node.layout.x + ' ' + node.layout.y + ')'), oldVisual
          }
          return this.createVisual(node, renderContext);
        },
        getTemplateMode: function(zoom) {
          return zoom > this.detailThreshold ? 0 : zoom > this.intermediateThreshold ? 1 : 2
        }
      });
    });
})();
