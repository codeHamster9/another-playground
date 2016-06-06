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
/*
 * @yjs:keep=command,commandParameter,commandTarget,controller,directive,link,module,replace,restrict,scope
 */
(function() {

  'use strict';
  var module = angular.module('ngbp');

  /**
   * A directive for binding a yFiles command to a button
   */
  module.directive("command", function () {

    var commands = {
      "fitContent": yfiles.canvas.GraphControl.FIT_GRAPH_BOUNDS_COMMAND,
      "zoomIn": yfiles.system.NavigationCommands.INCREASE_ZOOM,
      "zoomOut": yfiles.system.NavigationCommands.DECREASE_ZOOM
    };

    return {
      restrict: "A",
      replace: false,
      scope: {
        command: '@',
        commandParameter: '=',
        commandTarget: '='
      },
      link: function (scope, $element, attrs) {
        // get the command object from the name
        var cmd = getCommand(scope.command);
        var parameter = scope.commandParameter;
        var element = $element[0];
        if (element) {
          element.addEventListener("click", function () {
            if (cmd) {
              // execute the command
              var target = getTarget(scope.commandTarget);
              if (target) {
                cmd.executeOnTarget(parameter, target);
              } else {
                cmd.execute(parameter);
              }
            }
          })
        }
      }
    };

    function getCommand(name) {
      // get the command object from the name string
      return name in commands ? commands[name] : null;
    }

    function getTarget(target) {
      // look for the command target using the provided selector or element
      if (typeof(target) === "string") {
        return document.querySelector(target)["graphControl"];
      } else if (target instanceof Element) {
        return target["graphControl"];
      }
    }

  });

  /**
   * Evaluates the attribute value upon Enter or Escape press.
   * @yjs:keep
   */
  module.directive('enterPress', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13 || event.which == 27) {
          scope.$apply(function () {
            scope.$eval(attrs.enterPress);
          });
          event.preventDefault();
        }
      });
    };
  });

  /**
   * Abbreviates the given name and sets it as textContent.
   * @yjs:keep
   */
  module.directive('abbreviate', function () {
    return {
      restrict: "A",
      replace: false,
      scope: {
        'abbreviate': '@'
      },
      link: function (scope, $element, attrs) {
        abbreviate(scope.abbreviate, $element);
        scope.$watch("abbreviate", function (newVal, oldVal) {
          if (oldVal === newVal) {
            return;
          }
          abbreviate(newVal, $element);
        });
      }
    };

    function abbreviate(newVal, $element) {
      var s = newVal;
      if (s) {
        var strings = s.split(' ');
        var converted = strings[0].substr(0, 1) + ".";
        for (var i = 1; i < strings.length; i++) {
          converted += " " + strings[i];
        }
        $element[0].textContent = converted;
      }
    }
  });
})()
