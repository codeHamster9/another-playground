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
   * Uses the size constraints provided by the labels to further constrain the size of nodes.
   * @class demo.LabelSizeConstraintProvider
   * @template T
   * @implements {yfiles.input.ISizeConstraintProvider.<T>}
   */
  exports.LabelSizeConstraintProvider = new yfiles.ClassDefinition(function() {

    var /**number*/ BUTTON_SPACING = 20;

    /** @lends {demo.LabelSizeConstraintProvider.prototype} */
    return {

      '$with': [yfiles.input.ISizeConstraintProvider],

      'constructor': function(/**yfiles.input.ISizeConstraintProvider.<T>*/ delegateProvider) {
        this.delegateProvider = delegateProvider;
      },

      /**
       * @type {yfiles.input.ISizeConstraintProvider.<T>}
       * @private
       */
      'delegateProvider': null,

      /** @return {yfiles.geometry.SizeD} */
      'getMinimumSize': function(/**T*/ item) {
        var /**yfiles.geometry.SizeD*/ result = (this.delegateProvider !== null ? this.delegateProvider.getMinimumSize(item) : yfiles.geometry.SizeD.EMPTY).clone();
        item.labels.forEach(function(/**yfiles.graph.ILabel*/ label) {
          var /**yfiles.input.ISizeConstraintProvider.<T>*/ provider = label.labelModelParameter.model.lookup(yfiles.input.ISizeConstraintProvider/**.<T>*/.$class);
          if (provider !== null) {
            var /**yfiles.geometry.SizeD*/ minimumSize = provider.getMinimumSize(item);
            result = yfiles.geometry.SizeD.max(result, new yfiles.geometry.SizeD(minimumSize.width + BUTTON_SPACING, minimumSize.height));
          }
        });
        return result.clone();
      },

      /** @return {yfiles.geometry.SizeD} */
      'getMaximumSize': function(/**T*/ item) {
        return (this.delegateProvider !== null ? this.delegateProvider.getMaximumSize(item) : yfiles.geometry.SizeD.INFINITE).clone();
      },

      /** @return {yfiles.geometry.RectD} */
      'getMinimumEnclosedArea': function(/**T*/ item) {
        return (this.delegateProvider !== null ? this.delegateProvider.getMinimumEnclosedArea(item) : yfiles.geometry.RectD.EMPTY).clone();
      }

    };
  })


});});
