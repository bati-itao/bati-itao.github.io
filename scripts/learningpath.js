let learningPath = {
  dbug: false,
  contents: null,
  lang: "en",
  format: "table",
  init: function () {
    if (learningPath.dbug) console.log("Initing!");
    learningPath.setLang();
    learningPath.setFormat();
    //select correct json file
    let title = document.title.toUpperCase()
    let jsonFile;
 
    //using indexOf() since IE doesn't support includes(), returns -1 if not found
    if(title.indexOf('DOCUMENT') !== -1 || title.indexOf('DOCUMENTS') !== -1){
      jsonFile = "document-auditor-learning-path.json";
    } else if (title.indexOf("WEB") !== -1) {
      jsonFile = "web-auditor-learning-path.json";
    } else {
      jsonFile = null;
    }
    //end selection
    learningPath.getRemoteFile(
      jsonFile,
      learningPath.startDrawing
    );
  }, // End of init

  startDrawing: function (doc) {
    let container = null;
    container = document.getElementById("learningPathContainer");
    if (learningPath.dbug) console.log("Got doc: " + doc);
    learningPath.contents = JSON.parse(doc);
    if (container) {
      let metadata = learningPath.contents["metadata"];
      let blocks = learningPath.contents["blocks"];
      let h1 = learningPath.createHTMLElement(document, "h1", {
        id: "wb-cont",
        textNode: metadata["title"][learningPath.lang],
        property: "name",
        parentNode: container,
      });
      if (Object.assign) learningPath.createOptionsList(container);
      let introTxt = metadata["intro"][learningPath.lang];
      container.innerHTML += introTxt;
      for (let i = 0; i < blocks.length; i++) {
        let blockDet = learningPath.createHTMLElement(document, "details", {
          parentNode: container,
        });
        let blockSum = learningPath.createHTMLElement(document, "summary", {
          parentNode: blockDet,
          textNode:
            metadata["stringBundle"]["block"][learningPath.lang] +
            " " +
            blocks[i]["place"] +
            " - " +
            blocks[i]["title"][learningPath.lang],
        });
        let objectiveDiv = learningPath.createHTMLElement(document, "div", {
          parentNode: blockDet,
          class: "alert alert-info",
        });
        objectiveDiv.innerHTML =
          "<p><strong>" +
          metadata["stringBundle"]["objective"][learningPath.lang] +
          ": </strong>" +
          blocks[i]["objective"][learningPath.lang];
        if (blocks[i]["prerequisites"]) {
          let prereqDiv = learningPath.createHTMLElement(document, "div", {
            parentNode: blockDet,
            class: "alert alert-info",
          });
          prereqDiv.innerHTML =
            "<p><strong>" +
            metadata["stringBundle"]["prerequisites"][learningPath.lang] +
            ": </strong>" +
            blocks[i]["prerequisites"][learningPath.lang];
        }

        if (blocks[i].note)
          blockDet.innerHTML += blocks[i]["note"][learningPath.lang];

        if (learningPath.format == "table") {
          learningPath.drawTables(blockDet, metadata, blocks[i]["courses"]);
        } else if (learningPath.format == "list") {
          learningPath.drawLists(blockDet, metadata, blocks[i]["courses"]);
        } else if (learningPath.format == "cards") {
          learningPath.drawCards(blockDet, metadata, blocks[i]["courses"]);
        } else if (learningPath.format == "headings") {
          learningPath.drawHeadings(blockDet, metadata, blocks[i]["courses"]);
        }
      }
    } else {
    }
  }, // End of doc
  createOptionsList: function (container) {
    //returns -1 if not found
    if(window.location.search.indexOf("?format=") !== -1){
    let p = learningPath.createHTMLElement(document, "p", {
      parentNode: container,
      textNode: "View as:",
    });
    let ul = learningPath.createHTMLElement(document, "ul", {
      parentNode: container,
    });
    let types = ["table", "list", "headings", "cards"];
    for (let i = 0; i < types.length; i++) {
      let li = learningPath.createHTMLElement(document, "li", {
        parentNode: ul,
      });
      let a = learningPath.createHTMLElement(document, "a", {
        parentNode: li,
        href: document.location.pathname + "?format=" + types[i],
        textNode: types[i].charAt(0).toUpperCase() + types[i].slice(1),
      });
    }
    }
  }, // End of createOptionsList
  drawTables: function (container, metadata, courses) {
    let table = learningPath.createHTMLElement(document, "table", {
      parentNode: container,
      class: "table table-striped",
    });
    let thead = learningPath.createHTMLElement(document, "thead", {
      parentNode: table,
    });
    let tr = learningPath.createHTMLElement(document, "tr", {
      parentNode: thead,
    });
    let noTH = learningPath.createHTMLElement(document, "th", {
      parentNode: tr,
      scope: "col",
      textNode: metadata["stringBundle"]["number"][learningPath.lang],
    });
    let actTH = learningPath.createHTMLElement(document, "th", {
      parentNode: tr,
      scope: "col",
      textNode: metadata["stringBundle"]["activity"][learningPath.lang],
    });
    let methTH = learningPath.createHTMLElement(document, "th", {
      parentNode: tr,
      scope: "col",
      textNode: metadata["stringBundle"]["methods"][learningPath.lang],
    });
    let durTH = learningPath.createHTMLElement(document, "th", {
      parentNode: tr,
      scope: "col",
      textNode: metadata["stringBundle"]["duration"][learningPath.lang],
    });
    let instTH = learningPath.createHTMLElement(document, "th", {
      parentNode: tr,
      scope: "col",
      textNode:
        metadata["stringBundle"]["instructionsMaterials"][learningPath.lang],
    });

    let tbody = learningPath.createHTMLElement(document, "tbody", {
      parentNode: table,
    });
    for (let i = 0; i < courses.length; i++) {
      let tr = learningPath.createHTMLElement(document, "tr", {
        parentNode: tbody,
      });
      let noTD = learningPath.createHTMLElement(document, "td", {
        parentNode: tr,
        textNode: parseInt(i + 1),
      });
      let actTD = learningPath.createHTMLElement(document, "td", {
        parentNode: tr,
        textNode: courses[i]["title"][learningPath.lang],
      });
      let methTD = learningPath.createHTMLElement(document, "td", {
        parentNode: tr,
        textNode: courses[i]["method"][learningPath.lang],
      });
      let durTD = learningPath.createHTMLElement(document, "td", {
        parentNode: tr,
        textNode: courses[i]["duration"][learningPath.lang],
      });
      let instTD = learningPath.createHTMLElement(document, "td", {
        parentNode: tr,
      });

      learningPath.drawDL(instTD, courses[i]);
    }
  }, // End of drawTables
  drawDL: function (container, course) {
    let metadata = learningPath.contents.metadata;
    let dl = learningPath.createHTMLElement(document, "dl", {
      parentNode: container,
    });
    let purpDt = learningPath.createHTMLElement(document, "dt", {
      parentNode: dl,
      textNode: metadata["stringBundle"]["purpose"][learningPath.lang],
    });
    let purDD = learningPath.createHTMLElement(document, "dl", {
      parentNode: dl,
    });
    purDD.innerHTML = course["purpose"][learningPath.lang];
    if (course.goal) {
      let goalDt = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["goal"][learningPath.lang],
      });
      let goalDD = learningPath.createHTMLElement(document, "dl", {
        parentNode: dl,
      });
      goalDD.innerHTML = course["goal"][learningPath.lang];
    }
    if (course.materials) {
      let matDt = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["materials"][learningPath.lang],
      });
      let matDD = learningPath.createHTMLElement(document, "dd", {
        parentNode: dl,
      });
      matDD.innerHTML = learningPath.parseString(
        course["materials"][learningPath.lang],
        course["urls"]
      );
    }
    if (course.activity) {
      let actDt = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["activity"][learningPath.lang],
      });
      let actDD = learningPath.createHTMLElement(document, "dd", {
        parentNode: dl,
      });
      actDD.innerHTML = learningPath.parseString(
        course["activity"][learningPath.lang],
        course["urls"]
      );
    }
    if (course.cost) {
      let costDt = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["cost"][learningPath.lang],
      });
      let costDD = learningPath.createHTMLElement(document, "dl", {
        parentNode: dl,
      });
      costDD.innerHTML = course["cost"][learningPath.lang];
    }
    if (course.note) {
      let noteDt = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["note"][learningPath.lang],
      });
      let noteDD = learningPath.createHTMLElement(document, "dl", {
        parentNode: dl,
      });
      noteDD.innerHTML = course["note"][learningPath.lang];
    }
  }, // End of drawDL
  drawHeadings: function (container, metadata, courses) {
    for (let i = 0; i < courses.length; i++) {
      let noH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: container,
        textNode: metadata["stringBundle"]["number"][learningPath.lang],
      });
      let noP = learningPath.createHTMLElement(document, "p", {
        parentNode: container,
        textNode: parseInt(i + 1),
      });

      let actH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: container,
        textNode: metadata["stringBundle"]["activity"][learningPath.lang],
      });
      let actP = learningPath.createHTMLElement(document, "p", {
        parentNode: container,
        textNode: courses[i]["title"][learningPath.lang],
      });

      let metH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: container,
        textNode: metadata["stringBundle"]["methods"][learningPath.lang],
      });
      let methP = learningPath.createHTMLElement(document, "p", {
        parentNode: container,
        textNode: courses[i]["method"][learningPath.lang],
      });

      let durH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: container,
        textNode: metadata["stringBundle"]["duration"][learningPath.lang],
      });
      let durP = learningPath.createHTMLElement(document, "p", {
        parentNode: container,
        textNode: courses[i]["duration"][learningPath.lang],
      });

      let instH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: container,
        textNode:
          metadata["stringBundle"]["instructionsMaterials"][learningPath.lang],
      });
      learningPath.drawDL(container, courses[i]);
    }
  }, // End of drawHeadings
  drawLists: function (container, metadata, courses) {
    let ol = learningPath.createHTMLElement(document, "ol", {
      parentNode: container,
      start: "1",
    });
    for (let i = 0; i < courses.length; i++) {
      let li = learningPath.createHTMLElement(document, "li", {
        parentNode: ol,
      });

      let actH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: li,
        textNode: metadata["stringBundle"]["activity"][learningPath.lang],
      });
      let actP = learningPath.createHTMLElement(document, "p", {
        parentNode: li,
        textNode: courses[i]["title"][learningPath.lang],
      });

      let metH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: li,
        textNode: metadata["stringBundle"]["methods"][learningPath.lang],
      });
      let methP = learningPath.createHTMLElement(document, "p", {
        parentNode: li,
        textNode: courses[i]["method"][learningPath.lang],
      });

      let durH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: li,
        textNode: metadata["stringBundle"]["duration"][learningPath.lang],
      });
      let durP = learningPath.createHTMLElement(document, "p", {
        parentNode: li,
        textNode: courses[i]["duration"][learningPath.lang],
      });

      let instH3 = learningPath.createHTMLElement(document, "h3", {
        parentNode: li,
        textNode:
          metadata["stringBundle"]["instructionsMaterials"][learningPath.lang],
      });
      learningPath.drawDL(li, courses[i]);
    }
  }, // End of drawLists
  drawCards: function (container, metadata, courses) {
    let dl = learningPath.createHTMLElement(document, "dl", {
      parentNode: container,
    });
    for (let i = 0; i < courses.length; i++) {
      let noDT = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["number"][learningPath.lang],
      });
      let noDD = learningPath.createHTMLElement(document, "dd", {
        parentNode: dl,
        textNode: parseInt(i + 1),
      });

      let actDT = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["activity"][learningPath.lang],
      });
      let actDD = learningPath.createHTMLElement(document, "dd", {
        parentNode: dl,
        textNode: courses[i]["title"][learningPath.lang],
      });

      let metDT = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["methods"][learningPath.lang],
      });
      let methDD = learningPath.createHTMLElement(document, "dd", {
        parentNode: dl,
        textNode: courses[i]["method"][learningPath.lang],
      });

      let durDT = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode: metadata["stringBundle"]["duration"][learningPath.lang],
      });
      let durDD = learningPath.createHTMLElement(document, "dd", {
        parentNode: dl,
        textNode: courses[i]["duration"][learningPath.lang],
      });

      let instDT = learningPath.createHTMLElement(document, "dt", {
        parentNode: dl,
        textNode:
          metadata["stringBundle"]["instructionsMaterials"][learningPath.lang],
      });
      let instDD = learningPath.createHTMLElement(document, "dd", {
        parentNode: dl,
      });
      learningPath.drawDL(instDD, courses[i]);
    }
  }, // End of drawCards

  parseString: function (txt, urls) {
    let re = /{{urls\[(\d+)\]}}/;
    if (txt.match(re)) {
      do {
        let i = txt.match(re);
        let url = urls[i[1]]["url"];
        let lt = urls[i[1]]["text"];
        txt = txt.replace(
          re,
          '<a href="' +
            url +
            '" rel="noreferrer noopener" target="_blank">' +
            lt +
            "</a>"
        );
      } while (txt.match(re));
    }

    return txt;
  }, // End of parseString
  setLang: function () {
    let lang = document.documentElement.lang;
    if (lang.match(/fr/i)) {
      lang = "fr";
    } else {
      lang = "en";
    }
    learningPath.lang = lang;
  }, // End of setLang
  setFormat: function () {
    if (Object.assign) {
      // Because IE can't handle URL objects.
      let thisURL = new URL(document.location);
      let params = thisURL.searchParams;
      if (params.has("dbug")) {
        if (params.get("dbug") == "true") learningPath.dbug = true;
      }
      if (params.has("format")) {
        if (learningPath.dbug)
          console.log(
            "Has format and it's value is " + params.get("format") + "."
          );
        let format = params.get("format");
        if (learningPath.dbug) console.log("format: " + format);
        if (format.match(/(headings|cards|table|list)/i))
          learningPath.format = format;
        if (learningPath.dbug)
          console.log(
            "Has format and it's value is " + learningPath.format + "."
          );
      }
    }
  }, // End of setFormat
  getRemoteFile: function (file, callback) {
    var xmlhttp = new XMLHttpRequest();

    if (file.match(/^c:/i)) {
      file = file.replace(/\\/g, "/");
      file = "file:///" + file;
    }

    xmlhttp.open("GET", file, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 404) {
          callback("404");
        }
        if (xmlhttp.status == 0 || xmlhttp.status == 200) {
          callback(xmlhttp.responseText);
        }
      }
    };
    xmlhttp.send();
  }, // end of getRemoteFile
  createHTMLElement: function (creator, type, attribs) {
    var dbug =
      arguments.length == 4 && arguments[3] != null && arguments[3] != undefined
        ? true
        : false;
    if (dbug)
      console.log(
        "createHTMLElement::dbug: " +
          dbug +
          " because arguments.length: " +
          arguments.length +
          ", and argument[3]: " +
          arguments[3] +
          "."
      );
    if (dbug)
      console.log(
        "nordburg::createHTMLElement " +
          type +
          (attribs.hasOwnProperty("id") ? "#" + attribs["id"] : "") +
          (attribs.hasOwnProperty("textNode")
            ? " containing " + attribs["textNode"]
            : "") +
          "."
      );
    // From: http://stackoverflow.com/questions/26248599/instanceof-htmlelement-in-iframe-is-not-element-or-object
    var iwin = window;
    // idiv instanceof iwin.HTMLElement; // true
    var newEl = creator.createElement(type);
    for (var k in attribs) {
      if (dbug) console.log("Checking attrib " + k + ".");
      if (k == "parentNode") {
        if (dbug) console.log("createHTMLElement::Dealing with parentnode.");
        var parentNode = learningPath.getHTMLElement(creator, attribs[k], dbug);
        try {
          if (attribs.hasOwnProperty("insertBefore")) {
            var beforeEl = learningPath.getHTMLElement(
              creator,
              attribs["insertBefore"],
              dbug
            );
            parentNode.insertBefore(newEl, beforeEl);
          } else if (attribs.hasOwnProperty("insertAfter")) {
            var afterEl = learningPath.getHTMLElement(
              creator,
              attribs["insertAfter"],
              dbug
            );
            parentNode.insertBefore(newEl, afterEl.nextSibling);
          } else {
            parentNode.appendChild(newEl);
          }
        } catch (er) {
          console.error(
            "Error appending newEl to parentNode: " + er.message + "."
          );
        }
      } else if (k == "textNode" || k == "nodeText") {
        if (typeof attribs[k] == "string") {
          newEl.appendChild(creator.createTextNode(attribs[k]));
        } else if (
          attribs[k] instanceof iwin.HTMLElement ||
          attribs[k] instanceof HTMLElement
        ) {
          newEl.appendChild(attribs[k]);
        } else {
          newEl.appendChild(creator.createTextNode(attribs[k].toString()));
        }
      } else if (k.match(/^insert(Before|After)$/)) {
        // Do nothing.
      } else {
        newEl.setAttribute(k, attribs[k]);
      }
    }
    return newEl;
  }, // End of createHTMLElement
  countObjs: function (obj) {
    var returnValue = 0;
    for (var i in obj) {
      returnValue++;
    }
    return returnValue;
  }, // End of countObjs
  getHTMLElement: function (creator, el) {
    var rv = null;
    var dbug =
      arguments.length == 3 &&
      arguments[2] != null &&
      arguments[2] != undefined &&
      arguments[2] !== false
        ? true
        : false;
    var iwin = window;
    if (el instanceof HTMLElement || el instanceof iwin.HTMLElement) {
      rv = el;
    } else if (el instanceof String || typeof el === "string") {
      try {
        if (dbug) console.log("Trying to getHTMLElement " + el + ".");
        rv = creator.getElementById(el);
      } catch (er) {
        console.error(
          "Error getting HTML Element #" +
            el +
            ".  Apparently that's not on this page."
        );
      }
    }
    return rv;
  }, // End of getHTMLElement
};
document.addEventListener("DOMContentLoaded", learningPath.init, false);
