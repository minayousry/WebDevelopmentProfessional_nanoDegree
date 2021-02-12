/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',us&appid=641e76d6fb6a791cc947188cb406bed1&units=metric';

//Define GetData route to get data from openMap website and from server
const GetData = async (burl, zip = '', key = '') =>
{
    const response = await fetch(burl+zip+key);

    try
    {
        const newData = await response.json();
        return newData;
    }
    catch(error)
    {
        console.log("client get error:",error);
    }

}


//Define PostData route
const postData = async(url ='',data = {}) =>
{
    const response = await fetch(url,{
        //Set the method to post,because it's by default is GET
        method: 'POST',
        credentials: 'same-origin',
        headers:{'Content-Type' : 'application/json',},
        body:JSON.stringify(data),
    });

    
    try
    {
        const responseData = await response.json();
        return responseData;

    }
    catch(error)
    {
        console.log("Post resonse error:",error);
    }
}

//Add event Listener to generate button
document.getElementById("generate").addEventListener('click',onClickEvent);

function onClickEvent(e)
{
    const zipCode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    //console.log(zipCode);
    //console.log(feeling);
    var temp = "";

    // Create a new date instance dynamically with JS
    let d = new Date();
    let day = String(d.getDate()).padStart(2,'0');
    let month = String(d.getMonth() + 1).padStart(2,'0');
    let year = d.getFullYear();
    let newDate = day+'.'+ month+'.'+ year;


    if(zipCode)
    {
        //Call GetData request and make use of the received data
        GetData(baseURL,zipCode,apiKey).then(function(data)
        {
            
            //extract temperature of the received data from  openweathermap
            if(data.message != "Nothing to geocode" && data.message != "city not found")
            {
                temp = data.main['temp'].toString(10);
            }
            else
            {
                temp = "";
                console.log("enter valid zipcode");
            }

            if(!feeling)
            {
                console.log("enter valid feeling");
            }
            else if(temp)
            {
                //call the chained function
                StoreUpdateUI(newDate,temp,feeling);
            }
            
        
        });
    }
    else
    {
        console.log("enter valid zipcode");
    }

    
}

function updateUserInterface(date,temp,feeling)
{

    
    const dateElement = document.getElementById("date");
    const tempElement = document.getElementById("temp");
    const contentElement = document.getElementById("content");

    let showDate = "Date:";
    let showTemp = "Temperature:";
    let showFeel = "Feeling:";

    if(date)
    {
        showDate += date;
    }

    if(temp)
    {
        showTemp+= Math.round(temp) +' degrees';
    }

    if(feeling)
    {
        showFeel+=feeling;
    }

    dateElement.innerText = showDate;
    tempElement.innerText = showTemp;
    contentElement.innerText = showFeel;
}



function StoreUpdateUI(newDate,temp,feeling)
{
    const full_data = {'temperature':temp,
                        "date":newDate,
                        'user_response':feeling
                      };
    
    
    postData('/add',full_data);
    GetData('/all').then(function(data)
    {
        console.log(data);
        updateUserInterface(data['date'],data['temperature'],data['user_response']);
    });
    
}


