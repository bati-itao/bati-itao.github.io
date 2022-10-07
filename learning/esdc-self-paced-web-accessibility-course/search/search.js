let pagesIndex, searchIndex;
const MAX_SUMMARY_LENGTH = 100;
const SENTENCE_BOUNDARY_REGEX = /\b\.\s/gm;
const WORD_REGEX = /\b(\w*)[\W|\s|\b]?/gm;

//we need to create an JSON index file which will have all the page data without html tags 
const fakeJSON = [
  {
    categories: "accessibility module-1",
    content:
      "Blind w3c defines blindness as substantial uncorrectable loss of vision in both eyes people who are blind: use screen reading software to convert text into speech and/or braille; navigate the design using the keyboard; either listen to audio description of video or read the transcript; rely on properly coded html page structures (like lists, headings and tables) and controls (like links, buttons, and form controls) to read and navigate the design and operate its functionality. Video: demo of assistive technology screen reader hadi rangin is an expert user of screen reader software. In this video, he demonstrates the elements of a well-designed web page and how they sound to someone who is blind. Issues discussed include aria landmarks, headings, and text content. Designing for blindness provide equivalent text alternatives for images provide descriptive transcripts or audio description for video do not use colour as the only visual means of conveying information ensure all functionality is operable using a keyboard markup content with good structure and semantics (headings, landmarks, tables, lists, etc) provide name, role and value for custom controls provide users the options to stop, pause, and adjust the volume of audio content (independently of the system volume). Low vision w3c defines low vision as poor acuity (vision that is not sharp), tunnel vision (seeing only the middle of the visual field), central field loss (seeing only the edges of the visual field), and clouded vision. Low vision includes people with cataracts, diabetic retinopathy, glaucoma, hemianopia, macular degeneration, retinal detachment, etc. Vision loss can take many forms and it can be mild or quite extreme. For example, consider this image as seen with normal vision: one boy embraces another. Both are smiling each holds a ball. Some people have hypersensitivity to glare: bright areas of the image appear to glow white, hiding details. Some people may be colorblind: the reds of the image are desaturated. Orange appears green. Some people may see an entire image, but it might be either blurred or clouded: while others might see the center of the image often referred to as tunnel vision a rough circle of high detail is visible, about 10% of the image. And others still might see the edges of the image often called peripheral vision the centre 20% of the image is obscured by a grey circle low contrast causes barriers to interaction, as users may be unable to identify their location on a page, the state of links and controls, read text, or identify the content of images. People with low vision may enlarge text or change fonts, colours and spacing to make content more usable for their needs. People with a restricted field of view may not enlarge text, but benefit from responsive design (to narrow the display), from related information being grouped together, and from labels and controls being positioned closely to one another. Video: demo of assistive technology screen magnification in this video, discover how screen magnification software is used to access the web, and what web designers can do to improve access. Designing for low vision ensure sufficient contrast between text and background colour. Ensure the focus and hover state of links, buttons and other controls is visible. Provide clear visual distinction between content and controls (e. G. Between text and buttons, links, etc). Position labels close to their controls. Consider using colour to help users differentiate different regions of the page. Colour-blind the w3c defines colour blindness as difficulty distinguishing between colors such as between red and green, or between yellow and blue, and sometimes inability to perceive any color. Barriers for these users manifest anywhere colour alone communicates meaning. For instance, a form indicating required fields with a red label and no asterisk, or a link using blue without any other visual enhancement (an underline, 3:1 contrast with neighbouring text, border, etc. ). In the colour blindness simulation below, the red and green columns of the bar chart are barely distinguishable. The solution here is adding a background pattern, but the bars could also be labelled with visible text. Simulation of red-green colour blindness the original image: example begins a bar chart using green, blue and red bars. Example ends protanopia (red colour blind) simulation: example begins with the protanopia filter, the red and green colours become similarly brown. Example ends good example: using a background pattern in this example, background patterns are used to identify the three categories x, y and z. Colour is no longer solely communicating the meaning. Example beginsexample ends designing for colour blindness ensure sufficient contrast between text and background colour. Do not use colour as the only visual means of conveying information (e. G. , associate a text label or introduce a background pattern in addition to colour). Ensure links are visually distinguishable from neighbouring text with more than colour. Auditory disability w3 defines auditory disability as mild or moderate hearing loss in one or both ears (hard of hearing) to substantial and uncorrectable hearing loss in both ears (deafness). People with auditory disabilities cant hear the audio, prefer audio content in another form or in conjunction with captions. Most of the web is in a visual or text format. It is vital to make audio content accessible to users with a hearing impairment. Designing for auditory disability provide captions for audio-video content. Provide transcript for audio-video content. Provide transcript for audio-only content. Provide users the options to stop, pause, and adjust the volume of audio content (independently of the system volume). Deaf-blindness people who are deaf-blind use a screen reader with a refreshable braille display to read, which users feel with their fingers. People who are deaf-blind can only access multimedia content (audio only, video only, and video with audio) via its transcript. They cannot hear the audio, see the video or read the captions. Audio files need a basic transcript of the audio content, and video files need a descriptive transcript where both the audio and critical visual information is communicated. Designing for deafblind considerations for blind and auditory disability users apply, though video captions are inaccessible to braille in most assistive technology. Provide basic transcripts of audio files and descriptive transcripts of video files (transcripts that include all audio and all critical visual information). Braille device the braille device is typically situated directly below the keyboard. Screen readers intercept the page content and send the characters to the braille device. A braille device below a laptop keyboard. Motor disabilities motor disabilities can refer to a range of physical experiences. Using a mouse is often not an option. Users may have a temporary inability to use a single hand due to an injury, difficulty using or controlling their hands, little to no motor control of their limbs, or missing limbs/hands. People with motor disabilities often use alternate keyboards or input devices that act as keyboard emulators. Keyboard emulators include speech recognition software, sip and puff device, on-screen keyboards, scanning software and other assistive technologies. Its important to ensure all functionality of the content is operable through a keyboard interface. Video: demo of assistive technology sip and puff switch this video demonstrates the assistive technology (at) sip and puff switch. Jared is a young man with cerebral palsy who, with the help of at, is able to control his entire computer and run his graphic arts business through a sip and puff switch. Error loading closed captions current position:00:00:00total time:00:03:54 transcript - video: sip and puff switch source: pacer center [pacercenter]. (2013, may 14). Assistive technology in action - meet jared [video]. Youtube. Designing for motor disabilities ensure all functions are available via both mouse and keyboard for those users who may not be able to use the mouse. Allow users to remap or disable single key shortcuts. For those using voice input software: provide visible link and button text. Ensure the visible label matches or is part of the aria label, if one exists. Provide a minimum response time of 20 seconds before time expires. Ensure content works in both horizontal and vertical orientation and do not rely on swiping or dragging. Speech disabilities people with speech disabilities have difficulty with producing voice sounds and using muscles in their mouths. Designing for speech disabilities ensure that an alternative to voice-based services is provided in the form of chats, forms, email, etc. If a contact us page has a phone number also provide a text-based means of contact (an email or accessible contact us form). Ensure any voice search feature has a text-based search alternative. Cognitive, learning, and neurological disabilities cognitive disabilities are by far the most common type of disability. According to the w3c-wai, cognitive, learning and neurological disabilities affect any part of the nervous system and impact how well people hear, move, see, speak, and understand information. Cognitive, learning, and neurological disabilities do not necessarily affect the intelligence of a person. Examples of cognitive, learning, and neurological disabilities attention deficit hyperactivity disorder (adhd) involves difficulty focusing on a single task, focusing for longer periods, or being easily distracted. Autism spectrum disorder (asd) (includes autism, asperger syndrome, and pervasive developmental disorder (pdd)) involves impairments of social communication and interaction abilities, and sometimes restricted habits and interests. Intellectual disabilities (sometimes called learning disabilities in europe and some other countries, and developmental disabilities in other regions) involves impairments of intelligence, learning more slowly, or difficulty understanding complex concepts. Down syndrome is one among many different causes of intellectual disabilities. Learning disabilities is a functional term rather than a medical condition, and is not uniformly defined. In europe and some other countries, it refers to intellectual disabilities, while in australia, canada, the u. S. , and some other countries it refers to perceptual disabilities. Mental health disabilities includes anxiety, delirium, depression, paranoia, schizophrenia, and many other disorders. These conditions may cause difficulty focusing on information, processing information, or understanding it. In particular, medication for these disorders may have side effects including blurred vision, hand tremors, and other impairments. Memory impairments involves limited short-term memory, missing long-term memory, or limited ability to recall language. Dementia is one among many different causes of memory impairments. Multiple sclerosis causes damage to nerve cells in the brain and spinal cord, and can affect auditory, cognitive, physical, or visual abilities, in particular during relapses. Neurodiversity is a societal rather than medical term to describe the natural diversity in neurocognitive functioning, like gender, ethnicity, sexual orientation, and disability. Perceptual disabilities (sometimes called learning disabilities in australia, canada, the u. S. , and some other countries) involves difficulty processing auditory, tactile, visual, or other sensory information. This can impact reading (dyslexia), writing (dysgraphia), processing numbers (dyscalculia), or spatial and temporal orientation. Seizure disorders includes different types of epilepsy and migraines, which may be in reaction to visual flickering or audio signals at certain frequencies or patterns. Examples of barriers for people with cognitive, learning, and neurological disabilities complex navigation mechanisms and page layouts that are difficult to understand and use. Complex sentences that are difficult to read and unusual words that are difficult to understand. Long passages of text without images, graphs, or other illustrations to highlight the context. Moving, blinking, or flickering content, and background audio that cannot be turned off. Web browsers and media players that do not provide mechanisms to suppress animations and audio. Visual page designs that cannot be adapted using web browser controls or custom style sheets. Designing for cognitive, learning, and neurological disabilities people with cognitive, learning, and neurological disabilities often rely on: clearly structured content that facilitates overview and orientation. Consistent labeling of forms, buttons, and other content parts. Predictable link targets, functionality, and overall interaction. Different ways of navigating websites, such as hierarchical menu and search. Options to suppress blinking, flickering, flashing, and otherwise distracting content. Simpler text that is supplemented by images, graphs, and other illustrations. The canada. Ca style guide requires that externally-facing content have a grade 8 reading level, and internally-facing content have a grade 10 reading level. A measurement tool, the flesch-kincaid grade level test, is available in english only in microsoft word under the spelling and grammar options. The readability measurement tool www. Scolarius. Com (in french only) offers a similar metric for french text: a score between 50 and 89 corresponds to the primary level of education, between 90 an 119 at the high school level, 120 and 149 at the college level, from 150 to 189 at the university level. Seizures rapidly flashing lights or strobe-like effects in video, graphics or animation can cause photo-epileptic seizures in users with photosensitive epilepsy. Also known as convulsions, these are a sudden, uncontrolled electrical disturbance in the brain that can cause physical harm. Flashing lights can trigger a seizure if: lights flash more than 3 times per second. The flashing content is large enough. Wcag provides a complex formula here, but the rule of thumb is flashing content larger than 21,824 square pixels is problematic. The flashing content has high contrast. Wcag provides another complex formula here, but as an alternative recommends assessing flashing content using a tool such as the photosensitive epilepsy analysis tool (peat). Because users may magnify the page and so enlarge the flashing area, its safest to limit the flashing of any size content to no more than three flashes in any 1-second period designing for seizure disorders don't include flashing light sequences of 3 times or more per second in videos, animations, or transitions. If you cant edit the source, dont use it. Reading disabilities difficulty reading some people with cognitive disabilities and people with dyslexia have reading difficulties. For people with dyslexia, spelling or reading words can be error prone because visual encoding of text is difficult. Dyslexia simulation below is a simulation of the dyslexia reading experience, where letters appear to move and swap places. Dyslexia simulation designing for reading disabilities dont communicate solely through text. Supplement text with informative images, videos and audio. Most information in this article is from the web accessibility initiative (wai) document: diverse abilities and barriers. Shadi abou-zahra, eds. Copyright 2017 w3c (mit, ercim, keio). Status: updated 15 may 2017. Pagination menu previous - web accessibilitynext - accessibility guidelines section menu module 1 accessibility fundamentals web accessibility type of disabilities accessibility guidelines laws and government standards all modules module 1 - accessibility fundamentals module 2 - page structure and semantics module 3 links and navigation module 4 tables module 5 images module 6 forms module 7 visual design and colours module 8 zoom and responsive design module 9 - audio, video, animation and motion module 10 - input modalities module 11 - aria live and time limits appendix site map all best practices wcag view provide feedback on this course date modified:2022-10-05 related links contribute to this project report issues on this project suggest a change on this project about this web application contact informationterms and conditionsprivacysymbol of the government of canada",
    href: "../module1/types-of-disabilities.html",
    title: "Type of disabilities"
  },
  {
    categories: "accessibility module-1",
    content:
      'Web accessibility is about making websites, applications and content accessible to people with disabilities. More specifically, it means that people can perceive, understand, navigate and interact with the content. Tim berners-lee, w3c (world wide web consortium) director and inventor of www said that the power of the web is in its universality. Access by everyone regardless of disability is an essential aspect. Web accessibility addresses all disabilities that affect access, including visual, auditory, physical, speech, cognitive and neurological. Web accessibility also benefits people without disabilities, for example people using mobile devices, people with temporary disabilities or situational limitations, older people and people with slower or limited internet connection.',
    href: "../module1/web-accessibility.html",
    title: "Web accessibility"
  },
  {
    categories: "accessibility module-1",
    content:
      "Accessible canada act (aca) the accessible canada act came into effect on july 11, 2019. The purpose includes identifying, removing and preventing barriers in 7 key areas: service design and delivery built environment employment information and communication technologies communications transportation procurement the goals of aca include the realization of a barrier-free canada, culture change, standards development, proactive compliance and enforcement measures, monitoring and oversight. Aca applies to federally regulated entities including, government of canadas departments and agencies, crown corporations, parliament and federally-regulated private sector. Requirements include publishing accessibility plans, feedback processes and progress reports. The accessibility standards canada (asc) / canadian accessibility standards development organization (casdo) will form technical committees to develop accessibility standards in the 7 key areas. These committees will include experts, persons with disability and industry representatives. Accessibility standards will be posted online for public comment. The final standards will be submitted to the minister to be adopted into regulations. Government of canada the government of canada standard of web accessibility was developed to ensure the uniform application of a high level of web accessibility across government of canada public facing websites and web applications. The government of canada standard on web accessibility will soon be deprecated. It will be replaced by the upcoming ict accessibility standard. The new ict accessibility standard states that public-facing and internal-facing web content must meet the en 301 549 (european standard for digital accessibility). En 301 549 is updated to adopt the web content accessibility guidelines (wcag) 2.1 (level aa) for web content, electronic documents, and non-web software. The guideline on making information technology usable by all also requires that web content conform to en 301 549 and wcag 2.1 level aa. The esdc it accessibility office is leading the accessibility compliance project (acp) to ensure compliance of internally used websites and applications. The target conformance level is also wcag 2.1 aa.",
    href: "../module1/laws-and-government-standards.html",
    title: "Laws and Government Standards"
  },
  {
    categories: "accessibility guidlines module-1",
    content:
      'Introduction: accessibility guidelines the world wide web consortium (w3c) web accessibility initiative (wai) develops web accessibility standards: web content accessibility guidelines (wcag) addresses web content authoring tool accessibility guidelines (atag) addresses authoring tools accessible rich internet applications (wai-aria) addresses web applications, dynamic content and advanced user interface controls web content accessibility guidelines (wcag) the web content accessibility guidelines is technical standard document that explains how to make web content more accessible to people with disabilities. Web content generally refers to the information in a web page or web application, including: natural information such as text, images, and sounds code or markup that defines structure, presentation, etc. Wcag addresses barriers faced by a wide range of people with disabilities, including those with visual, auditory, physical, speech, cognitive and neurological disabilities. These guidelines also address accessibility of web content on desktops, laptops, tablets and mobile devices. As well, these guidelines will make web content more usable to all users in general. Versions first introduced as version wcag 1.0 in 1999. Wcag 2.0 standard was released in 2008. The current wcag 2.1 standard was published in 2018. Wcag 2.2 is scheduled to be completed and published in 2021. All criteria from 2.0 and 2.1 are included in 2.2. Wcag 2.2 has 9 additional criteria wcag 3.0 draft was published first published on jan 2021. It introduces new conformance model: bronze, silver and gold. Wcag 2.1 layers of guidance principles  there are 4 principles that provide the foundation for web accessibility: perceivable, operable, understandable, and robust. Guidelines - under each principle are guidelines. The 13 guidelines ensure that content is directly accessible to as many people as possible, and capable of being re-presented in different forms success criteria - under each guideline, there are success criteria that describe what must be achieved to conform to wcag. Success criteria are written as testable (true or false) statements that are not technology-specific. All success criteria are important access issues for people with disabilities. Each success criteria is assigned a conformance level a, level aa (better), level aaa (best). There are 50 level a and aa success criteria in wcag 2.1. Esdc wcag conformance level target esdc is aiming to achieve wcag 2.1 level aa conformance for internally used websites, web applications, applications and cots products. Wcag 2.1 at a glance this section provides a paraphrased summary of wcag 2.1. Perceivable provide text alternatives for non-text content. Provide captions and other alternatives for multimedia. Create content that can be presented in different ways, including by assistive technologies, without losing meaning. Make it easier for users to see and hear content. Operable make all functionality available from a keyboard. Give users enough time to read and use content. Do not use content that causes seizures or physical reactions. Help users navigate and find content. Make it easier to use inputs other than keyboard. Understandable make text readable and understandable. Make content appear and operate in predictable ways. Help users avoid and correct mistakes. Robust maximize compatibility with current and future user tools. Information in this section is from the web accessibility initiative (wai) document: wcag 2.1 at a glance (w3c). Shawn lawton henry and wayne dick, eds. Copyright  2018 w3c (mit, ercim, keio). Status: updated 5 june 2018. Authoring tool accessibility guidelines (atag) what is atag? The authoring tool accessibility guidelines (atag) 2.0 became w3c recommendation on 24 september 2015 which is now part of the world wide web consortium - web accessibility initiative (w3c-wai). Authoring tools can help developers and assist users in the creation of accessible web content through proper design standards. What are authoring tools? Authoring tools are software and services used to create web content, including: software tools for website management like content management systems (cms) platforms tools designed to produce web content (e. G. , what-you-see-is-what-you-get (wysiwyg) html, xml editors) websites that let users add content, such as blogs and wikis tools that convert documents into web formats (e. G, , word processors) how atag and wcag are inter-related web developers usually use authoring tools and evaluation tools to create web content. People use web browsers, media players, assistive technologies, or other user agents to get and interact with the content. Atag 2.0 at a glance atag 2.0 is divided into two parts. Part a relates to the accessibility of authoring tool user interfaces to authors with disabilities. Part b relates to support by authoring tools for the creation of web content that is more accessible to end users with disabilities. Part a) make the authoring tool user interface accessible ensure both web-based and non-web-based functionality is accessible. Editing views are perceivable by making alternative content available to authors ensure editing views are operable such as keyboard access to authoring features, provide text search of content, help authors avoid flashing content etc. Ensure editing views are understandable by documenting the user interface, including all accessibility features and help authors avoid and correct mistakes. Part b) support the production of accessible content ensure that automatically specified content is accessible and is preserved. Ensure content product is accessible by guiding and assisting authors in producing and managing accessible content and templates. Ensure authors are supported in improving the accessibility of existing content by checking and repairing accessibility problems ensure that the authoring tools promotes proper documentation and integrate features in production of accessible content. Information in this section is from the web accessibility initiative (wai) document: atag at a glance. Shawn lawton henry and wayne dick, eds. Copyright  2021 w3c  (mit, ercim, keio, beihang). Status: updated 1 july 2020. First published july 2005. Accessible rich internet applications (wai-aria) wai-aria, the accessible rich internet applications suite, defines a way to make web content and web applications more accessible to people with disabilities. It especially helps screen reader users and keyboard users with dynamic content and advanced user interface controls developed with html, javascript, and related technologies. Wai-aria provides a framework for adding attributes to identify features for user interaction, how they relate to each other, and their current state. With wai-aria, developers can identify different regions of the page to enable screen reader users to easily move between regions. They can also create widgets such as buttons, drop-down lists, carousels, calendar functions, tabs, sliders, disclosures (show/hide), and others. Wai-aria 1.2 technical specification, provides features to define accessible user interface elements and to improve the accessibility and interoperability of web content and applications. The wai-aria technical specification is an occasional reference, for something like the definition of an aria attribute. Its oriented primarily at user agent implementers. Aria authoring practices guide, recommends approaches to help web application developers make widgets, navigation, and behaviours accessible using wai-aria attributes (roles , states, and properties, described later in the course). The wai-aria authoring practices is a commonly-referenced how-to manual with thorough design patterns for widgets, including expected keyboard interaction and behaviour and working examples with complete html, css and javascript. Web accessibility toolkit (wet) equivalent widgets the web accessibility toolkit (wet) is an award-winning front-end framework of flexible and themeable templates and reusable components that are accessible, usable, interoperable, mobile friendly and multilingual. Wet implements widgets mostly in line with the patterns described in the wai-aria authoring practices. Always check wet for a widget before designing one from scratch. Web experience toolkit (wet) - working examples - web experience toolkit (wet-boew. Github. Io) some widgets common to wet and the wai-aria authoring practices wai-aria authoring practices	wet accordion	toggle  accordion carousel	tabbed interface  carousel dialog (modal)	lightbox disclosure (show/hide)	toggle  grouped menu	menu tabs	tabbed interface',
    href:
      "../module1/accessibility-guidelines.html",
    title: "Accessibility guidelines"
  },
  {
    categories: "module-2",
    content:
      "Designing with landmarks landmarks, also known as page regions, enable screen reader users to identify and navigate directly to important sections of a web page, skipping over blocks of content. Once you introduce landmarks, ensure all content on the page is included in a landmark as content outside a landmark can be easily missed. You identify regions of the page with html5 sectioning elements or aria landmark role attributes. Html5 region elements and their equivalent aria landmark role attributes html5 sectioning element	aria landmark roles	region <header> when child of <body>	role='banner'	header - top region of every page that contains info such as logo, search, and nav options. <footer>	role='contentinfo'	footer bottom region of every page that contains info such as copyright, privacy or disclaimers <main>	role='main'	main content region of a page <nav>	role='navigation'	navigation menu <aside>	role='complementary'	complementary content regions that support the main content that is separate and meaningful, such as side note explaining the main content n/a	role='search'	search a region that contains a collection of items and objects that, as a whole, combine to create search functionality. <form>	role='form'	form - a region that contains a collection of items and objects that, as a whole, combine to create a form. <section>	role='region'	the <section> element represents a generic standalone section of a document, which doesn't have a more specific semantic element to represent it. Sections should always have a heading, with very few exceptions. Good example: common landmarks in this example, html5 sectioning elements define the landmarks for the most part. The role='search' attribute is unique and descriptive. Example begins screenshot of landmark roles in their conventional locations. A header region holds nav and role='search' landmarks. Below the header, left to right, are nav, main and aside landmarks. At the bottom is the footer landmark. Example endshtmlcode begins <header> <nav aria-label='global'>[... ]</nav> <form role='search'>[... ]</form> </header> <div> <nav aria-label='main'>[... ]</nav> <main>[... ]</main> <aside>[... ]</aside> </div> <footer>[... ]</footer> code ends below, the markup uses aria landmark role attributes to define the regions. Htmlcode begins <div role='banner'> <div role='navigation' aria-label='global'>[... ]</div> <form role='search'>[... ]</form> </div> <div> <div role='navigation' aria-label='main'>[... ]</div> <div role='main'>[... ]</div> <div role='complementary'>[... ]</div> </div> <div role='contentinfo'>[... ]</div> code ends best practice for landmarks ensure all content on the page is contained within a landmark. Use html5 sectioning elements (preferred) to identify regions on a page. Use aria landmark role attributes if html5 sectioning elements cannot be used. Ensure only one instance of: <header> as child of <body>, or role='banner'. A <header> is not considered a banner when it is the child of <article>, <aside>, <main>, <nav> or <section>. <footer> <main> ensure these landmarks are direct children of <body>: <header> (when the banner) <footer> <main> limit the use of <nav> to primary and secondary navigations. Use the aria-label or aria-labelledby attribute to differentiate multiple <nav> items. Use the aria-labelledby attribute to label a <nav> region that begins with a heading element. Provide short and descriptive labels. The landmark role is declared by a screen reader along with the name, if any. Do not use the landmark role (e. G. , 'navigation') as part of the name; for instance, the label is 'site' not 'site navigation' for a navigation landmark. Use role='search' rather than role='form' when the form is used for search functionality. If the <form> element is named (using aria-label, aria-labelledby or title attribute), it will be designated as a landmark. If you use role='form', provide a brief label (using aria-label, aria-labelledby or title attribute) that describes the purpose of the form. If the <section> element is named (using aria-label, aria-labelledby or title attribute), it will be designated as a landmark. If you use role='region', provide a brief label (using aria-label, aria-labelledby or title attribute) that describes the purpose of the content in the region.",
    href: "../module2/landmarks.html",
    title: "Landmarks"
  
  }
];

async function initSearchIndex() {
  try {
    pagesIndex = fakeJSON;
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

function searchBoxFocused() {
  document.querySelector(".search-container").classList.add("focused");
  document
    .getElementById("search")
    .addEventListener("focusout", () => searchBoxFocusOut());
}

function searchBoxFocusOut() {
  document.querySelector(".search-container").classList.remove("focused");
}

function handleSearchQuery(event) {
	document.querySelector(".search-error").classList.add("hidden");
  event.preventDefault();
  const query = document.getElementById("search").value.trim().toLowerCase();
  if (!query) {
    displayErrorMessage("Please enter a search term");
    return;
  }
  const results = searchSite(query);
  if (!results.length) {
    displayErrorMessage("Your search returned no results");
    return;
  }
  renderSearchResults(query, results);
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
    return query;
  }
  query = "";
  for (const term of searchTerms) {
    query += `+${term} `;
  }
  return query.trim();
}

function renderSearchResults(query, results) {
  clearSearchResults();
  updateSearchResults(query, results);
  showSearchResults();
  scrollToTop();
}

function clearSearchResults() {
  const results = document.querySelector(".search-results ul");
  while (results.firstChild) results.removeChild(results.firstChild);
}

function updateSearchResults(query, results) {
  document.querySelector(".search-results ul").innerHTML = results
    .map(
      (hit) => `
    <li class="search-result-item" data-score="${hit.score.toFixed(2)}">
      <a href="${hit.href}" target="_blank" class="search-result-page-title">${hit.title}</a>
      <p>${createSearchResultBlurb(query, hit.content)}</p>
    </li>
    `
    )
    .join("");
  const searchResultListItems = document.querySelectorAll(".search-results ul li");
  document.getElementById("results-count").innerHTML = searchResultListItems.length;
  document.getElementById("results-count-text").innerHTML = searchResultListItems.length > 1 ? "results" : "result";
  searchResultListItems.forEach(
    (li) => (li.firstElementChild.style.color = getColorForSearchResult(li.dataset.score))
  );
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
    query += `${term}|`;
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

function getColorForSearchResult(score) {
  const warmColorHue = 171;
  const coolColorHue = 212;
  return adjustHue(warmColorHue, coolColorHue, score);
}

function adjustHue(hue1, hue2, score) {
  if (score > 3) return `hsl(${hue1}, 100%, 50%)`;
  const hueAdjust = (parseFloat(score) / 3) * (hue1 - hue2);
  const newHue = hue2 + Math.floor(hueAdjust);
  return `hsl(${newHue}, 100%, 50%)`;
}

function handleClearSearchButtonClicked() {
  hideSearchResults();
  clearSearchResults();
  document.getElementById("search").value = "";
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
  document
    .querySelectorAll(".clear-search-results")
    .forEach((button) =>
      button.addEventListener("click", () => handleClearSearchButtonClicked())
    );
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
