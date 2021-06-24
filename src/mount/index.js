import mermaid from 'mermaid';
import $ from '../3rd/jquery';
import PR from '../3rd/prettify';

/** ************* RESIZE ***************/
var $resizer = $('#resizer');
var $lnb = $('#lnb');
var $main = $('#main');

function resize(event) {
  var { clientX } = event;

  clientX = Math.max(200, clientX);
  clientX = Math.min(500, clientX);

  $lnb.css('width', clientX);
  $resizer.css('left', clientX);
  $main.css('left', clientX + $resizer.width());
}

function detachResize() {
  $(window).off({
    mousemove: resize,
    mouseup: detachResize
  });
}

$resizer.on('mousedown', () => {
  $(window).on({
    mousemove: resize,
    mouseup: detachResize
  });
});

/** ************* SEARCH - AUTOCOMPLETE ***************/
var $searchContainer = $('#search-container');
var $searchInput = $searchContainer.find('input');
var $searchedList = $searchContainer.find('ul');
var $anchorList = $('nav ul li a');
var $selected = $();

var KEY_CODE_UP = 38;
var KEY_CODE_DOWN = 40;
var KEY_CODE_ENTER = 13;
function clear() {
  $searchedList.html('');
  $searchInput.val('');
  $selected = $();
}
function moveToPage(url) {
  if (url) {
    window.location = url;
  }
  clear();
}
$(window).on('click', event => {
  if (!$searchContainer[0].contains(event.target)) {
    clear();
  }
});

$searchedList.on('click', 'li', event => {
  var { currentTarget } = event;
  var url = $(currentTarget)
    .find('a')
    .attr('href');

  moveToPage(url);
});

function removeWhiteSpace(value) {
  return value.replace(/\s/g, '');
}

function onKeyupEnter() {
  if (!$selected.length) {
    $selected = $searchedList.find('li').first();
  }
  moveToPage($selected.find('a').attr('href'));
}
function isMatched(itemText, inputText) {
  return (
    removeWhiteSpace(itemText)
      .toLowerCase()
      .indexOf(inputText) > -1
  );
}

function makeListItemHtml(item, inputText) {
  var itemText = item.text;
  var itemHref = item.href;
  var $parent = $(item).closest('div');
  var memberof = '';

  if ($parent.length && $parent.attr('id')) {
    memberof = $parent.attr('id').replace('_sub', '');
  } else {
    memberof = $(item)
      .closest('div')
      .find('h3')
      .text();
  }

  if (memberof) {
    memberof = `<span class="group">${memberof}</span>`;
  }

  itemText = itemText.replace(new RegExp(inputText, 'ig'), matched => {
    return `<strong>${matched}</strong>`;
  });

  return `<li><a href="${itemHref}">${itemText}</a>${memberof}</li>`;
}
function setList(inputText) {
  var html = '';

  $anchorList
    .filter((idx, item) => {
      return isMatched(item.text, inputText);
    })
    .each((idx, item) => {
      html += makeListItemHtml(item, inputText);
    });
  $searchedList.html(html);
}

function onKeyupSearchInput(event) {
  var inputText = removeWhiteSpace($searchInput.val()).toLowerCase();

  if (event.keyCode === KEY_CODE_UP || event.keyCode === KEY_CODE_DOWN) {
    return;
  }

  if (!inputText) {
    $searchedList.html('');
    return;
  }

  if (event.keyCode === KEY_CODE_ENTER) {
    onKeyupEnter();
    return;
  }

  setList(inputText);
}

function onKeydownInput(event) {
  $selected.removeClass('highlight');

  switch (event.keyCode) {
    case KEY_CODE_UP:
      $selected = $selected.prev();
      if (!$selected.length) {
        $selected = $searchedList.find('li').last();
      }
      break;
    case KEY_CODE_DOWN:
      $selected = $selected.next();
      if (!$selected.length) {
        $selected = $searchedList.find('li').first();
      }
      break;
    default:
      break;
  }

  $selected.addClass('highlight');
}

$searchInput.on({
  keyup: onKeyupSearchInput,
  keydown: onKeydownInput
});

var source = document.getElementsByClassName('prettyprint source linenums');
var i = 0;
var lineNumber = 0;
var lineId;
var lines;
var totalLines;
var anchorHash;
var lineNumberHTML = '';

if (source && source[0]) {
  anchorHash = document.location.hash.substring(1);
  lines = source[0].getElementsByTagName('li');
  totalLines = lines.length;

  for (; i < totalLines; i++) {
    lineNumber++;
    lineId = `line${lineNumber}`;
    lines[i].id = lineId;

    lineNumberHTML = `<span class="number">${i + 1} : </span>`;

    lines[i].insertAdjacentHTML('afterBegin', lineNumberHTML);
    if (lineId === anchorHash) {
      lines[i].className += ' selected';
    }
  }
}
export function initializeMermaid() {
  $('.lang-mermaid').each(function replaceWithDiv() {
    const $el = $(this);
    $el.replaceWith(`<div class="mermaid">${$el.text()}</div>`);
  });
  mermaid.initialize({
    startOnLoad: true
  });
}
export function prettyPrint() {
  PR.prettyPrint();
  var source = document.getElementsByClassName('prettyprint source linenums');
  var i = 0;
  var lineNumber = 0;
  var lineId;
  var lines;
  var totalLines;
  var anchorHash;
  var lineNumberHTML = '';

  if (source && source[0]) {
    anchorHash = document.location.hash.substring(1);
    lines = source[0].getElementsByTagName('li');
    totalLines = lines.length;

    for (; i < totalLines; i++) {
      lineNumber++;
      lineId = `line${lineNumber}`;
      lines[i].id = lineId;

      lineNumberHTML = `<span class="number">${i + 1} : </span>`;

      lines[i].insertAdjacentHTML('afterBegin', lineNumberHTML);
      if (lineId === anchorHash) {
        lines[i].className += ' selected';
      }
    }
  }
}
