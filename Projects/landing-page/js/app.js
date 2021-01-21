/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const sectionsData = document.querySelectorAll(".landing__container");
const navigationList = document.getElementById("navbar__list");
const sections = []

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

function extractSections()
{
  for(sectionData of sectionsData)
  {
    sections.push(sectionData.parentElement);
  }
}

function IsElementInViewPort(element)
{
  let result;
  const rectBound = element.getBoundingClientRect();

  const viewPortWidth = (window.innerWidth || document.documentElement.clientWidth);
  const viewPortHeight = (window.innerHeight || document.documentElement.clientHeight);

  if((rectBound.top >= 0) && (rectBound.left >= 0) &&
      (rectBound.bottom <= viewPortHeight) &&
      (rectBound.right <= viewPortWidth))
      {
        result =  true;
      }
      else
      {
        result = false;
      }
      return result
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

function ShowClickedItem(clicked_item)
{


  let item = navigationList.firstElementChild;

  while(item != null)
  {
      if (clicked_item.id == item.id)
      {
        clicked_item.className = "selectedItem";
      }
      else
      {
        item.className = "menu__link";
      }
      item = item.nextElementSibling;
  }
}


function onClickEvent(event)
{
  event.preventDefault();

  //Show Clicked item
  ShowClickedItem(event.target);


  const targetName = event.target.textContent;

  const id_element = document.querySelector("#"+targetName);

  if(id_element != null)
  {
    window.location.hash = targetName;
  }

}

function onscrollTOEvent(event)
{
    ActivateViewPortSection();
}





// build the nav
function buildNavigationMenu()
{
  const fragment = document.createDocumentFragment();

  navigationList.addEventListener("click",onClickEvent);

  for(section of sections)
  {
    const liElement = document.createElement('li');
    liElement.textContent = section.id;
    liElement.id = "nav"+section.id;
    liElement.className = "menu__link";
    fragment.appendChild(liElement);
  }

  navigationList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function ActivateViewPortSection()
{
  let result;

  for(section of sections)
  {
    result =  IsElementInViewPort(section);
    if(result == true)
    {
      section.className = "your-active-class";
    }
    else
    {
      section.className = "not-active-class";
    }
  }
}
// Scroll to anchor ID using scrollTO event
function SetScrollEvent()
{
  window.addEventListener("scrollTO", onscrollTOEvent);
  window.addEventListener("scroll", onscrollTOEvent);
}


/**
 * End Main Functions
 * Begin Events
 *
*/

//Extract sections
extractSections();

// Build menu
// Scroll to section on link click
buildNavigationMenu();

// Set sections as active
SetScrollEvent();
