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
var detailTemplate = '<g ng-class="\'svg\' + [item.position]">\
<rect fill="url(#nodeGradient)" stroke="#249AE7" stroke-width="3" rx="8" ry="8" width="250" height="100"/>\
<image ng-href="{{item.icon}}" transform="translate(5 15)" width="58px" height="66px" xlink:href="resources/usericon_female1.svg"/>\
<text transform="translate(80 20)"  style="font-size:16px; font-family:Arial; fill:#505050">{{item.name}}</text>\
<text transform="translate(80 38)" style="font-size:12px; font-family:Arial; fill:#505050">{{item.position}}</text>\
</g>';

var intermediateTemplate = '<g ng-class="\'svg\' + [item.position]">\
    <rect fill="url(#nodeGradient)" stroke="#249AE7" stroke-width="3" rx="8" ry="8" width="250" height="100"/>\
    <text transform="translate(125 50)" style="font-size:22px; font-family:Arial; fill:#505050;\
    text-anchor: middle; dominant-baseline: central;">{{item.name}}</text>\
  </g>';

var overviewTemplate = '<g ng-class="\'svg\' + [item.position]">\
    <rect fill="url(#nodeGradient)" stroke="#249AE7" stroke-width="3" rx="8" ry="8" width="250" height="100"/>\
    <text transform="translate(125 50)" style="font-size:26px; font-family:Arial; fill:#505050;\
    text-anchor: middle; dominant-baseline: central;" data-abbreviate="{{item.name}}"></text>\
  </g>';


  var round_detailTemplate = '<g ng-class="\'svg\' + [item.position]">\
    <circle fill="url(#nodeGradient)" stroke="#249AE7" stroke-width="3" cx="8" cy="8" r="30" width="250"/>\
    <image ng-href="{{item.icon}}" transform="translate(5 15)" width="58px" height="66px" xlink:href="resources/usericon_female1.svg"/>\
    <text transform="translate(80 20)"  style="font-size:16px; font-family:Arial; fill:#505050">{{item.name}}</text>\
    <text transform="translate(80 38)" style="font-size:12px; font-family:Arial; fill:#505050">{{item.position}}</text>\
  </g>';

  var round_intermediateTemplate = '<g ng-class="\'svg\' + [item.position]">\
      <circle fill="url(#nodeGradient)" stroke="#249AE7" stroke-width="3" cx="8" cy="8" r="30" width="250"/>\
      <text transform="translate(125 50)" style="font-size:22px; font-family:Arial; fill:#505050;\
      text-anchor: middle; dominant-baseline: central;">{{item.name}}</text>\
    </g>';

  var round_overviewTemplate = '<g ng-class="\'svg\' + [item.position]">\
      <circle fill="url(#nodeGradient)" stroke="#249AE7" stroke-width="3" cx="8" cy="8" r="30" width="250"/>\
      <text transform="translate(125 50)" style="font-size:26px; font-family:Arial; fill:#505050;\
      text-anchor: middle; dominant-baseline: central;" data-abbreviate="{{item.name}}"></text>\
    </g>';