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
//
// The JSON model data for the organization chart example.
//
// @yjs:keep
//
var nodeData = [{
  id: "0",
  position: "Chief Executive Officer",
  name: "Eric Joplin",
  children: [{
    id: "0_0",
    position: "Chief Executive Assistant",
    name: "Gary Roberts",
    children: [{
      id: "0_0_0",
      position: "Senior Executive Assistant",
      name: "Alexander Burns"
    }, {
      id: "0_0_1",
      position: "Junior Executive Assistant",
      name: "Linda Newland"
    }]
  }, {
    id: "0_1",
    position: "Vice President of Production",
    name: "Amy Kain"
  }]
}, {
  id: "1",
  position: "European Sales Manager",
  name: "Robert Hartman"
}];

var edgeData = [
  { "from": "Eric Joplin", "to": "Gary Roberts" },
  { "from": "Eric Joplin", "to": "Amy Kain" },
  { "from": "Eric Joplin", "to": "Richard Fuller" },
  { "from": "Eric Joplin", "to": "David Kerry" },
  { "from": "Gary Roberts", "to": "Alexander Burns" },
  { "from": "Gary Roberts", "to": "Linda Newland" },
  { "from": "Amy Kain", "to": "Dorothy Turner" },
  { "from": "Amy Kain", "to": "Larry Littlefield" },
  { "from": "Amy Kain", "to": "Anne Binger" },
  { "from": "Amy Kain", "to": "Ray Hammond" },
  { "from": "Amy Kain", "to": "Kathy Maxwell" },
  { "from": "Richard Fuller", "to": "Joe Vargas" },
  { "from": "Richard Fuller", "to": "Robert Hartman" },
  { "from": "David Kerry", "to": "Aaron Buckman" },
  { "from": "David Kerry", "to": "Joy Medico" },
  { "from": "David Kerry", "to": "Walter Hastings" },
  { "from": "David Kerry", "to": "Danny Welch" },
  { "from": "Dorothy Turner", "to": "Valerie Burnett" },
  { "from": "Dorothy Turner", "to": "Edward Monge" },
  { "from": "Larry Littlefield", "to": "Rico Cronin" },
  { "from": "Anne Binger", "to": "Timothy Jackson" },
  { "from": "Ray Hammond", "to": "Bob Lacey" },
  { "from": "Ray Hammond", "to": "Ronnie Garcia" },
  { "from": "Joe Vargas", "to": "Robert Parson" },
  { "from": "Joe Vargas", "to": "Melissa Noren" },
  { "from": "Robert Hartman", "to": "Rebecca Polite" },
  { "from": "Robert Hartman", "to": "Michael Daniels" },
  { "from": "Walter Hastings", "to": "Susan Moran" },
  { "from": "Walter Hastings", "to": "Melvin Cruz" },
  { "from": "Walter Hastings", "to": "Rachel King" },
  { "from": "Joy Medico", "to": "Edward Lewis" },
  { "from": "Danny Welch", "to": "Leroy Vison" },
  { "from": "Danny Welch", "to": "Mark Parks" },
  { "from": "Danny Welch", "to": "Linda Lenhart" },
  { "from": "Valerie Burnett", "to": "Martin Cornett" },
  { "from": "Edward Monge", "to": "Lisa Jensen" },
  { "from": "Edward Monge", "to": "Howard Meyer" },
  { "from": "Timothy Jackson", "to": "Carmen Langenhagen" },
  { "from": "Timothy Jackson", "to": "Thomas Stark" },
  { "from": "Edward Lewis", "to": "Mildred Bean" },
  { "from": "Edward Lewis", "to": "Raymond Lindley" },
];
