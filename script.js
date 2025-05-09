document.addEventListener('DOMContentLoaded',function(){
    const searchBtn = document.getElementById('search-btn');
   //search when search button is clicked
    searchBtn.addEventListener('click',searchCountry);
    console.log(searchCountry);




    function searchCountry(){
        const countryName = countryInput.value.trim();






    }

    fetch(`https://restcountries.com/v3.1/name${countryName}`)
    .then((res)=> res.json())
    .then((data) =>(data))



})