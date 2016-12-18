
var searchTextValue = "";
var startDate = 0;
var endDate = 0;
var numofResults = 0;
var authKey = "a15142ef741446348ede55f0e027778a";

var queryURLInit = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

$('#run-search').on('click', function(){

numofResults = $("#number-of-records-input").val();	
searchTextValue = $("#search-text-input").val().trim();
startDate = $("#start-date-input").val().trim();
endDate = $("#end-date-input").val().trim();

console.log("Input form details= ", searchTextValue ," ", numofResults, " ", startDate, " ", endDate);

var queryURL = queryURLInit + searchTextValue;

if (parseInt(startDate)) {
	queryURL = queryURL + "&begin_date=" + parseInt(startDate) + "0101";
}

if (parseInt(endDate)) {
	queryURL = queryURL + "&end_date=" + parseInt(endDate) + "1230";
}

console.log("Search URL = " + queryURL);

var articleNumber = 0;

 $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(NYTResponse) {
    
    if(NYTResponse != null){
    	console.log(NYTResponse);

    	for(var i=0; i< numofResults; i++){
    		articleNumber++;

	    	var outPutDivSection = $('<div>');
	    	outPutDivSection.attr("class", "article-result");
	    	outPutDivSection.attr("id", "article-" + i);
	    	outPutDivSection.css("background-color", "#e9e9e9");
	    	outPutDivSection.css("padding", "15px");
	    	outPutDivSection.css("margin-top", "10px");

	    	var outPutInformation =

	    	'<h3><span class="label label-default">' + articleNumber + '</span>   ' + NYTResponse.response.docs[i].headline.main + '</h3>'+ 
	    	'<p>' + 'Section : ' + NYTResponse.response.docs[i].section_name + '</p>'+ 
	    	'<p>' + 'Date : ' + NYTResponse.response.docs[i].pub_date + '</p>'+ 
	    	'<p><a href="' + NYTResponse.response.docs[i].web_url + '" >' + NYTResponse.response.docs[i].web_url + '</a></p>';

	    	outPutDivSection.html(outPutInformation);

	    	$("#search-results").append(outPutDivSection);


    		console.log("***************************************");
    		console.log(articleNumber);
    		console.log(NYTResponse.response.docs[i].headline.main);
    		console.log(NYTResponse.response.docs[i].section_name);
    		console.log(NYTResponse.response.docs[i].pub_date);
    		console.log(NYTResponse.response.docs[i].web_url);


    	}

    }


});


});