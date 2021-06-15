let path = [];
let guidesArray = [];
$(document).ready(function () {
  //get all guides and add to guidesArray
  getGuides(); 
  $("form[name='index.html']").validate({
      // Specify validation rules
      rules: {
        "tourname": {
          required: true,
          minlength: 5
        },
        "duration": {
          required: true,
          digits: true,
          minlength: 1
        },
        "price": {
          required: true,
          digits: true,
          minlength: 2
        },
        "guide_email":{
          "guide_email":true
        },
        "guide_phone": {
          required: true,
          digits: true,
          minlength: 10
        },
      },
      // Specify validation error messages
      messages: {       
        price: "price need to be more then 10",
        guide_phone: "need to be at least 10 digits ",
        duration: "need to be at least 1 digit ",
        tourname: "need to be at least 5 characters",
        guide_email: "email structure is some@domain "
      }
    });

  // process the form
  $('#tour_form').submit(function (event) {
      if(!$("#tour_form").valid()) return;

      console.log("in submit");
      let guide ={
        "name": $("#guide_name").val(),
        "email": $("#guide_email").val(),
        "cellular": $("#guide_phone").val(),
      }
      let site = {
        "name": $("#name").val(),
        "country": $("#country").val(),
      }
      path.push(site);
    
       // process the form
       $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/createTour/'+ $("#tourname").val(), // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
          "tourname": $("#tourname").val(),
          "date": $("#date").val(),
          "duration": $("#duration").val(),
          "price": $("#price").val(),
          "guide": $("#guide_name").val(),
          "path": path,               
        }),
        processData: false,            
       // dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function( data ){
            location.href = "/";

        },
        error: function( jqXhr, textStatus, errorThrown){
             alert( errorThrown);
        }
    })
        
      // stop the form from submitting the normal way and refreshing the page
      event.preventDefault();
  });

});


function getGuides(){
  let res =$.ajax({
  type: 'GET',
  url: "/getGuides",
  dataType: 'json',
  success: function (data) {
    guidesArray = data;
    displayguides();
  },
  error: function (err) {
    console.log("err", err);
  }
});
return res;
}
//go thorw all the guides and added them to the scroll list of guides
function displayguides(){
  for(let i = 0; i < guidesArray.length ; i++){
    const guide = $("<option></option>").text(guidesArray[i].guide_name).val(guidesArray[i]._id);
    $("#guide_name").append(guide);
  }
}


