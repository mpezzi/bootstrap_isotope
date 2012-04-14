mql = (function(doc, undefined){
  var bool,
      docElem  = doc.documentElement,
      refNode  = docElem.firstElementChild || docElem.firstChild,
      idCounter = 0;

  return function(q, cb){
    var id = 'mql-' + idCounter++,
        callback = function() {
          cb({ matches: (div.offsetWidth == 42), media: q });
        },
        div = doc.createElement('div');

        div.className = 'mq';
        div.style.cssText = "position:absolute;top:-100em";
        div.id = id;
        div.innerHTML = '&shy;<style media="'+q+'"> #'+id+' { width: 42px; }</style>';

        div.addEventListener('webkitTransitionEnd', callback, false);
        div.addEventListener('transitionend', callback, false); //Firefox
        div.addEventListener('oTransitionEnd', callback, false); //Opera

        docElem.insertBefore(div, refNode);
        //don't delete the div, we need to listen to events
        return { matches: div.offsetWidth == 42, media: q };
  };
})(document);