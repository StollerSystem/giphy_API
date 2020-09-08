import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {
  $('#searchBtn').click(function(event) {
    event.preventDefault(); 
    const inputtedSearch = $('#search').val();
    $('#search').val("");

    let request = new XMLHttpRequest();
   const url = `http://api.giphy.com/v1/gifs/search?q=${inputtedSearch}&api_key=${process.env.API_KEY}&limit=20`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) { //appid
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
        //  $('#output').text(`The humidity in ${inputtedSearch} is ${response.data[0].embed_url}`);
      // $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
      response.data.forEach(function(element){
         $("#output").append(`<IMG SRC=${element.url}>`)
         //$("#output")
        console.log(element)
      })
     
    }
  
  });
});