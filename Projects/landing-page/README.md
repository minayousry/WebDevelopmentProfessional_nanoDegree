# Landing Page Project

## Table of Contents
* [Instructions](Instructions)
* [GlobalVariables](GlobalVariables)
* [HelperFunctions](HelperFunctions)
* [MainFunctions](MainFunctions)
* [Events](Events)

## Instructions

The starter project has some HTML and CSS styling to display a static version of the Landing Page project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js`

## GlobalVariables

* sectionsData:contain all sections inner data
* navigationList:contain all navigation elements
* sections:contain all sections elements

## HelperFunctions

* extractSections():Fill global sections variables with all sections elements
* IsElementInViewPort():check if the element is in the viewport or not and return true/false

## MainFunctions

* ShowClickedItem():To paint the clicked element with red and others with default paint
* ActivateViewPortSection():to Activate the section in the viewport by changing it's class
* buildNavigationMenu():To build the navigation unordered list and create newEventListener if one of the items is clicked
* SetScrollEvent():To create 2 events listner for scrolling mapped to the same function which Activate the current section


## Events

* onClickEvent():function to be called if a click on one of the navigation items happened
* onscrollTOEvent():function to be called if a scroll happened


