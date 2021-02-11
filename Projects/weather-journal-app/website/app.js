/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = ',us&appid=641e76d6fb6a791cc947188cb406bed1';

//Define GetData route
const GetData = async (burl, zip, key) =>
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
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


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
        showTemp+=temp;
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
    
    
    postData('/add',full_data).then(function(data)
    {
        updateUserInterface(newDate,temp,feeling);
    });
    
}


