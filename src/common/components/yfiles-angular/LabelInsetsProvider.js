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
  /**
   * Provides insets for node instances via the insets suggested by the labels.
   * @class demo.LabelInsetsProvider
   * @template T
   * @implements {yfiles.drawing.IInsetsProvider.<T>}
   */
  exports.LabelInsetsProvider = new yfiles.ClassDefinition(function() {
    /** @lends {demo.LabelInsetsProvider.prototype} */
    return {

      '$with': [yfiles.drawing.IInsetsProvider],

      'constructor': {
        'default': function() {
          demo.LabelInsetsProvider.FromInsets.call(this, yfiles.geometry.InsetsD.EMPTY);
        },
        'FromInsets': function(/**yfiles.geometry.InsetsD*/ outerInsets) {
          this.outerInsets = outerInsets.clone();
        }
      },

      /**
       * @type {yfiles.geometry.InsetsD}
       * @private
       */
      'outerInsets': null,

      /** @return {yfiles.geometry.InsetsD} */
      'getInsets': function(/**T*/ item) {
        var /**yfiles.geometry.InsetsD*/ result = yfiles.geometry.InsetsD.EMPTY;
        item.labels.forEach(function(/**yfiles.graph.ILabel*/ label) {
          var /**yfiles.drawing.IInsetsProvider.<T>*/ provider = label.labelModelParameter.model.lookup(yfiles.drawing.IInsetsProvider/**.<T>*/.$class);
          if (provider !== null) {
            var /**yfiles.geometry.InsetsD*/ insets = provider.getInsets(item);
            result = result.createUnion(insets);
          }
        });
        return result.createUnion(this.outerInsets);
      }

    };
  })


});});
