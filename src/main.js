import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {  
  $('#searchBtn').click(function(event) {
    const results = "limit="+$("#results").val();
    event.preventDefault(); 
    const inputtedSearch = $('#search').val();
    $('#search').val("");
    $("h1").show();
    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/search?q=${inputtedSearch}&api_key=${process.env.API_KEY}&${results}`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) { 
        const response = JSON.parse(this.responseText);        
        getElements(response);
      }
    };  
    request.open("GET", url, true);
    request.send();
  });


  $('#trending').click(function(event) {
    const results = "limit="+$("#results").val();
    event.preventDefault();
    let newrequest = new XMLHttpRequest();
    const trendingurl = `http://api.giphy.com/v1/gifs/trending?&api_key=${process.env.API_KEY}&${results}`;
    newrequest.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) { 
        const newresponse = JSON.parse(this.responseText);
        getTrendingElements(newresponse);
      }
    };  
    newrequest.open("GET", trendingurl, true);
    newrequest.send();  
  });   
   
  $('#uploadfile').click(function(event) {
    event.preventDefault();
    let uploadrequest= new XMLHttpRequest();
    const uploadfile = $('#yourupload').val();
    const uploadurl = `http://upload.giphy.com/v1/gifs&api_key=${process.env.API_KEY}&file=${uploadfile}`
    console.log(uploadurl);
    uploadrequest.open("POST",uploadurl, true)
    uploadrequest.send();
    $('#yourupload').append("Upload is complete.")
  })

  $('#random').click(function(event) {
    event.preventDefault();
    let randrequest = new XMLHttpRequest();
    const randomurl = `http://api.giphy.com/v1/gifs/random?&api_key=${process.env.API_KEY}`;
    randrequest.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) { 
        const randresponse = JSON.parse(this.responseText);
        getRandomElements(randresponse);
      }
    };  
    randrequest.open("GET", randomurl, true);
    randrequest.send();  
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

  function getRandomElements(randresponse) {
    $("#random-output").append(`<IMG SRC=${randresponse.data.images.downsized.url}>`);     
  }
});

  
