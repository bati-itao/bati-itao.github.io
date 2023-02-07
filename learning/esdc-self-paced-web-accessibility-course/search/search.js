let pagesIndex, searchIndex;
const MAX_SUMMARY_LENGTH = 100;
const SENTENCE_BOUNDARY_REGEX = /\b\.\s/gm;
const WORD_REGEX = /\b(\w*)[\W|\s|\b]?/gm;
var results;
//we need to create an JSON index file which will have all the page data without html tags 


async function initSearchIndex() {
  try {
    pagesIndex = indexJSON;
    searchIndex = lunr(function () {
      this.field("title");
      this.field("categories");
      this.field("content");
      this.ref("href");
      pagesIndex.forEach((page) => this.add(page));
    });
  } catch (e) {
    console.log(e);
  }
}

function handleSearchQuery(event) {
	document.querySelector(".search-error").classList.add("hidden");
  event.preventDefault();
  const query =  document.getElementById("search");
  var lang = "en";
	 if(query == undefined)
	 {
		 query =  document.getElementById("search-fr").value.trim();
		 lang = "fr";
	 }else{
		 query = query.value.trim();
	 }
  if (!query) {
    displayErrorMessage("Please enter a search term");
    return;
  }
  results = searchSite(query);
  if (!results.length) {
    displayErrorMessage("Your search returned no results");
    return;
  }
  renderSearchResults(query, results, lang);
}

function displayErrorMessage(message) {
  document.querySelector(".search-error-message").innerHTML = message;
  document.querySelector(".search-container").classList.remove("focused");
  document.querySelector(".search-error").classList.remove("hidden");
}

function searchSite(query) {
  const originalQuery = query;
  query = getLunrSearchQuery(query);
  let results = getSearchResults(query);
  return results.length
    ? results
    : query !== originalQuery
    ? getSearchResults(originalQuery)
    : [];
}

function getSearchResults(query) {
  return searchIndex.search(query).flatMap((hit) => {
    if (hit.ref == "undefined") return [];
    let pageMatch = pagesIndex.filter((page) => page.href === hit.ref)[0];
    pageMatch.score = hit.score;
    return [pageMatch];
  });
}

function getLunrSearchQuery(query) {
  const searchTerms = query.split(" ");
  if (searchTerms.length === 1) {
	  query = "+" + query;
	  console.log(query);
    return query;
  }
  query = "";
  var op = "+";
  for (const term of searchTerms) {
	  if(term == "OR"){
		  op = " ";
	  }
	  console.log(op);
	  if(term != "AND" && term != "OR"){
		  query += op + `${term} `;
	  }
  }
  return query.trim();
}

function renderSearchResults(query, results, lang, page) {
	document.getElementById("search").value = query;
  clearSearchResults();
  updateSearchResults(query, results, lang, page);
  showSearchResults();
  scrollToTop();
}

function clearSearchResults() {
  const results = document.querySelector(".search-results ol");
  while (results.firstChild) results.removeChild(results.firstChild);
}

function updateSearchResults(query, results, lang, page) {
	if(lang == "fr"){
		 document.querySelector(".search-results ol").innerHTML = results
		.map(
		  (hit) => `
		<li class="search-result-item" data-score="${hit.score.toFixed(2)}">
		  <a href="${hit.href}" target="_blank" class="search-result-page-title">${hit.heading}</a>
		  <p><small>dans <i>${hit.title}</i></small></p>
		  <p>${createSearchResultBlurb(query, hit.content)}</p>
		</li>
		`
		)
		.join("");
	  const searchResultListItems = document.querySelectorAll(".search-results ol li");
	  document.getElementById("results-pagination").innerHTML = `
	  <ul class="pagination">
  <li><a href="#" rel="prev">Previous</a></li>
  <li><a href="#">1 <span class="wb-inv">Go to Page 1</span></a>
  <li><a href="#">2 <span class="wb-inv">Go to Page 2</span></a></li>
  <li><a href="#" rel="next">Next</a></li>
</ul>
	  
	  `;
	  document.getElementById("results-count").innerHTML = searchResultListItems.length;
	  document.getElementById("results-count-text").innerHTML = searchResultListItems.length > 1 ? "results" : "result";
	}
	else{
		
	const paginationSize = document.getElementById("pagination_size").value;
	var listHtml ="";
	const totalPages = Math.ceil(results.length/paginationSize);
	if(page == undefined)
		page = 1;
	else
		page = parseInt(page);
	//build the pagination bar
	var htmlStringPagination = ' <ul class="pagination">';
	if(page > 1)
		 htmlStringPagination += '<li><a href="search_form.html?q='+query+'&page='+(page-1)+'" rel="prev">Previous</a></li>'
	for (let i = 0; i < totalPages; i++) {
		if(i+1 == page)
			htmlStringPagination += '<li class="active"><a href="search_form.html?q='+query+'&page='+(i+1)+'" >'+(i+1)+' <span class="wb-inv">Go to Page '+(i+1)+'</span></a>';
		else
			htmlStringPagination += '<li><a href="search_form.html?q='+query+'&page='+(i+1)+'">'+(i+1)+' <span class="wb-inv">Go to Page '+(i+1)+'</span></a>';
	}
	if(page != totalPages)
		htmlStringPagination += ' <li><a href="search_form.html?q='+query+'&page='+(page+1)+'"rel="next">Next</a></li>'
	htmlStringPagination += '</ul>';
	document.getElementById("results-pagination").innerHTML = htmlStringPagination;
	
	//build the results
   const last_page= Math.ceil(results.length / paginationSize);
   const from= ((page - 1) * paginationSize) + 1;
   var to = page * paginationSize;
   if(to > results.length)
	   to = results.length-1;
	
	Object.entries(results).slice(from,to+1).forEach((hit,keys)=>{
		 document.querySelector(".search-results ol").start = from;
		  document.querySelector(".search-results ol").innerHTML += `
		<li class="search-result-item" data-score="`+ hit[1].score.toFixed(2)+`">
		  <a href="`+hit[1].href+`" target="_blank" class="search-result-page-title">`+hit[1].heading+`</a>
		  <p><small>In <i>`+hit[1].title+`</i></small></p>
		  <p>`+createSearchResultBlurb(query, hit[1].content)+`</p>
		</li>
		`;
		});
		
	
	  const searchResultListItems = document.querySelectorAll(".search-results ol li");
	  
	 
	  document.getElementById("results-count").innerHTML = results.length-1;
	  document.getElementById("results-count-text").innerHTML = results.length > 1 ? "results" : "result";
	  document.getElementById("pagination-count").innerHTML = to;
	  document.getElementById("pagination-from").innerHTML = from;
	}
}

function createSearchResultBlurb(query, pageContent) {
  const searchQueryRegex = new RegExp(createQueryStringRegex(query), "gmi");
  const searchQueryHits = Array.from(
    pageContent.matchAll(searchQueryRegex),
    (m) => m.index
  );
  const sentenceBoundaries = Array.from(
    pageContent.matchAll(SENTENCE_BOUNDARY_REGEX),
    (m) => m.index
  );
  let searchResultText = "";
  let lastEndOfSentence = 0;
  for (const hitLocation of searchQueryHits) {
    if (hitLocation > lastEndOfSentence) {
      for (let i = 0; i < sentenceBoundaries.length; i++) {
        if (sentenceBoundaries[i] > hitLocation) {
          const startOfSentence = i > 0 ? sentenceBoundaries[i - 1] + 1 : 0;
          const endOfSentence = sentenceBoundaries[i];
          lastEndOfSentence = endOfSentence;
          parsedSentence = pageContent.slice(startOfSentence, endOfSentence).trim();
          searchResultText += `${parsedSentence} ... `;
          break;
        }
      }
    }
    const searchResultWords = tokenize(searchResultText);
    const pageBreakers = searchResultWords.filter((word) => word.length > 50);
    if (pageBreakers.length > 0) {
      searchResultText = fixPageBreakers(searchResultText, pageBreakers);
    }
    if (searchResultWords.length >= MAX_SUMMARY_LENGTH) break;
  }
  return ellipsize(searchResultText, MAX_SUMMARY_LENGTH).replace(
    searchQueryRegex,
    "<strong>$&</strong>"
  );
}

function createQueryStringRegex(query) {
  const searchTerms = query.split(" ");
  if (searchTerms.length == 1) {
    return query;
  }
  query = "";
  for (const term of searchTerms) {
	  if(term != "AND" && term != "OR"){
		query += `${term}|`;
	  }
  }
  query = query.slice(0, -1);
  return `(${query})`;
}

function tokenize(input) {
  const wordMatches = Array.from(input.matchAll(WORD_REGEX), (m) => m);
  return wordMatches.map((m) => ({
    word: m[0],
    start: m.index,
    end: m.index + m[0].length,
    length: m[0].length,
  }));
}

function fixPageBreakers(input, largeWords) {
  largeWords.forEach((word) => {
    const chunked = chunkify(word.word, 20);
    input = input.replace(word.word, chunked);
  });
  return input;
}

function chunkify(input, chunkSize) {
  let output = "";
  let totalChunks = (input.length / chunkSize) | 0;
  let lastChunkIsUneven = input.length % chunkSize > 0;
  if (lastChunkIsUneven) {
    totalChunks += 1;
  }
  for (let i = 0; i < totalChunks; i++) {
    let start = i * chunkSize;
    let end = start + chunkSize;
    if (lastChunkIsUneven && i === totalChunks - 1) {
      end = input.length;
    }
    output += input.slice(start, end) + " ";
  }
  return output;
}

function ellipsize(input, maxLength) {
  const words = tokenize(input);
  if (words.length <= maxLength) {
    return input;
  }
  return input.slice(0, words[maxLength].end) + "...";
}

function showSearchResults() {
  document.querySelector(".primary").classList.add("hide-element");
  document.querySelector(".search-results").classList.remove("hide-element");
  document.getElementById("clearBtn").classList.remove("hidden");
}

function scrollToTop() {
  const toTopInterval = setInterval(function () {
    const supportedScrollTop = document.body.scrollTop > 0 ? document.body : document.documentElement;
    if (supportedScrollTop.scrollTop > 0) {
      supportedScrollTop.scrollTop = supportedScrollTop.scrollTop - 50;
    }
    if (supportedScrollTop.scrollTop < 1) {
      clearInterval(toTopInterval);
    }
  }, 10);
}


function handleClearSearchButtonClicked() {
	document.getElementById("clearBtn").classList.add("hidden");
	document.getElementById("results-header").classList.add("hidden");
  hideSearchResults();
  clearSearchResults();
   document.getElementById("results-count").innerHTML = "";
  document.getElementById("results-count-text").innerHTML = "";
  document.getElementById("results-pagination").innerHTML = "";
}

function hideSearchResults() {
  document.querySelector(".search-results").classList.add("hide-element");
  document.querySelector(".primary").classList.remove("hide-element");
}

initSearchIndex();
document.addEventListener("DOMContentLoaded", function () {
	
  if (document.getElementById("search-form") != null) {
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("focus", () => searchBoxFocused());
    searchInput.addEventListener("keydown", (event) => {
      if (event.keyCode == 13) handleSearchQuery(event);
    });
    
   
  }
  var searchbox =  document.getElementById("search");
   var lang = "en";
	 if(searchbox == undefined)
	 {
		 searchbox =  document.getElementById("search-fr").value.trim();
		 lang = "fr";
	 }else{
		 searchbox = searchbox.value.trim();
	 }
	 
  let searchParams = new URLSearchParams(window.location.search)
	let query = searchParams.get('q');
	let page = searchParams.get('page');
	if(query != null){
		 const results = searchSite(query);
		  if (!results.length) {
			displayErrorMessage("Your search returned no results");
			return;
		  }
		  renderSearchResults(query, results, lang, page);
	}
  
  document
    .querySelectorAll(".clear-search-results")
    .forEach((button) =>
      button.addEventListener("click", () => handleClearSearchButtonClicked())
    );
	
	document.getElementById("pagination_size_btn").addEventListener("click", function() {
	  if(query != null){
		 const results = searchSite(query);
		 renderSearchResults(query, results, lang, page);
	}
	});
});

if (!String.prototype.matchAll) {
  String.prototype.matchAll = function (regex) {
    "use strict";
    function ensureFlag(flags, flag) {
      return flags.includes(flag) ? flags : flags + flag;
    }
    function* matchAll(str, regex) {
      const localCopy = new RegExp(regex, ensureFlag(regex.flags, "g"));
      let match;
      while ((match = localCopy.exec(str))) {
        match.index = localCopy.lastIndex - match[0].length;
        yield match;
      }
    }
    return matchAll(this, regex);
  };
}
