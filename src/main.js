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
      if (this.readyState === 4 && this.status === 200) { 
        const response = JSON.parse(this.responseText);
        console.log("First request!")
        getElements(response);
      }
    };
  
    request.open("GET", url, true);
    request.send();

    });

    $('#trending').click(function(event) {
      event.preventDefault();
      let newrequest = new XMLHttpRequest();
      const trendingurl = `http://api.giphy.com/v1/gifs/trending?&api_key=${process.env.API_KEY}&limit=20`;
      newrequest.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) { 
        const newresponse = JSON.parse(this.responseText);
        getTrendingElements(newresponse);
        }
      };  
      newrequest.open("GET", trendingurl, true);
      newrequest.send();  
    });  

    
    
    
    function getElements(response) {        
      response.data.forEach(function(element){
        $("#output").append(`<IMG SRC=${element.images.downsized.url}>`);
      });
    }

    function getTrendingElements(newresponse) {        
      newresponse.data.forEach(function(element){
        $("#trending-output").append(`<IMG SRC=${element.images.downsized.url}>`);
      });
    }
});

  
