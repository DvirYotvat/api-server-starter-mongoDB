let json_array = []

// get the tour id
let catchId = new URLSearchParams(window.location.search)
let tour_index = catchId.get("tour_index")

$(document).ready(function () {
   //get all guides and add to guidesArray
  getGuides(); 

  $.ajax({
    url: "http://localhost:3001/getTours",
    success: function (result) {
      json_array = result
    },
    error: function (err) {
      console.log("err", err);
    },
  });

  let site = 

  // for(let i = 0; i < json_array[tour_index][1].path; i++){
  //   site = site + json_array[tour_index][1].path.name + json_array[tour_index][1].path.country
  //   path.push(site);
  // }
  //alert("tour_index:" + tour_index)
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
      },
      // Specify validation error messages
      messages: {       
        price: "price need to be more then 10",
        duration: "need to be at least 1 digit ",
        tourname: "need to be at least 5 characters"
      }
    });

  // process the form
  $('#edit_form').submit(function (event) {
      if(!$("#edit_form").valid()) return;

      alert("in submit");
      // let guide ={
      //   "name": $("#guide_name").val(),
      //   "email": $("#guide_email").val(),
      //   "cellular": $("#guide_phone").val(),
      // }

      let path = [];
      path = json_array[tour_index].path
      //alert(json_array[tour_index]._id)
      // process the form
      $.ajax({
          type: 'PUT', // define the type of HTTP verb we want to use (POST for our form)
          url: '/updateTour/' + json_array[tour_index]._id, // the url where we want to POST
          contentType: 'application/json',
          data: JSON.stringify({
              // "id": $("#tourname").val(),
              "date": $("#date").val(),
              "duration": $("#duration").val(),
              "price": $("#price").val(),
              //"guide": $("#guide_name").val(),
              //"path": path,             
          }),
          processData: false,            
         // dataType: 'json', // what type of data do we expect back from the server
          encode: true,
          success: function( data, textStatus, jQxhr ){
            alert("success")
              console.log("data" + data);
              $(location).attr('href',"/");
          },
          error: function( jqXhr, textStatus, errorThrown ){
              console.log( errorThrown );
              alert(errorThrown)

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
    //alert(i)
    const guide = $("<option></option>").text(guidesArray[i].guide_name).val(guidesArray[i]._id);
    $("#guide_name").append(guide);
  }
}
