let json_array = [];

$(document).ready(function () {
  $.ajax({
    url: "http://localhost:3001/getTours",
    success: function (result) {
      json_array = result;
      show_tours();
    },
    error: function (err) {
      console.log("err", err);
    },
  });
});

//
function show_tours() {

  let str;

  str = `
  <label for="guide_name" style="text-align: center"> Choose a guide to delete:</label>
  <select name="guide_name" id="guide_name">             
  </select> <td> <button onclick="deleteGuide()" id=""> Delete guide </button>`;

  for (let i = 0; i < json_array.length; i++) {
    let tourName = json_array[i].tourname;
    str =
      str +
      '<tr><td> <p id ="trips_heders" </p> Trip name: ' +
      json_array[i].tourname +
      ":</td>";
    str =
      str + "<td> <button onclick=\"edit('" + i + '\')" id=""> edit</button>';
    str =
      str +
      "<td> <button onclick=\"delete_tour('" +
      json_array[i]._id +
      '\')" id=""> delete</button>';
    str =
      str +
      "<td> <button onclick=\"addSite('" +
      i +
      '\')" id=""> Add site</button></tr>';

    str = str + '<td><p id ="heders" </p> Start date: </td>';
    str = str + '<td><p id ="heders" </p> Duration: </td>';
    str = str + '<td><p id ="heders" </p> Price: </td>';
    str = str + '<td><p id ="heders" </p> Guide name: </td>';
    str = str + '<td><p id ="heders" </p> Guide email: </td>';
    str = str + '<td><p id ="heders" </p> Guide phone: </td></tr>';

    str = str + "<td>" + json_array[i].date + "</td>";
    str = str + "<td>" + json_array[i].duration + " days</td>";
    str = str + "<td>" + json_array[i].price + "$</td>";

    str = str + "<td>" + json_array[i].guide.guide_name + "</td>";
    str = str + "<td>" + json_array[i].guide.guide_email + "</td>";
    str = str + "<td>" + json_array[i].guide.guide_phone + "</td></tr>";

    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";

    str = str + '<td><p id ="heders" </p> path name: </td>';
    str = str + "<td>  </td>";
    str = str + '<td><p id ="heders" </p> path location: </td></tr>';

    for (let j = 0; j < json_array[i].path.length; j++) {
      let site_name = json_array[i].path[j].name;
      str = str + "<td>" + json_array[i].path[j].name + "</td>";
      str = str + "<td> => </td>";
      str = str + "<td>" + json_array[i].path[j].country + "</td>";
      str =
        str +
        '<td> <button onclick="delete_site(' +
        i +
        "," +
        j +
        ')" id="' +
        json_array[i] +
        '">delete site</button></tr>';
    }
    str = str + '<td> <div id="' + i + '" ></div> </td></tr>';

    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
    str = str + "<td> </td></tr>";
  }

  $("#table").html(str);
  getGuides();
}

// delete tour from the json
function delete_tour(id) {
  $.ajax({
    type: "DELETE",
    url: "/deleteTour/" + id,
    contentType: "application/json",
    success: function () {
      alert("You delete tour: " + id);
      json_array.splice(id, 1);
      show_tours();
    },
    error: function (err) {
      console.log("err", err);
    },
  });
}

// delete site from the json
function delete_site(tour_index, trip_index) {
  // alert(json_array[tour_index]._id)
  // alert(json_array[tour_index].path[trip_index].name)
  $.ajax({
    type: "DELETE", // define the type of HTTP verb we want to use (POST for our form)
    url:
      "/deleteSite/" +
      json_array[tour_index]._id +
      "/" +
      json_array[tour_index].path[trip_index].name, // the url where we want to POST
    contentType: "application/json",
    processData: false,
    // dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function () {
      alert("You delete tour: " + json_array[tour_index].path[trip_index].name);
      json_array[tour_index].path.splice(trip_index, 1);
      show_tours();
    },
    error: function (err) {
      console.log("err", err);
    },
  });
}

// sent the tour id to the edit html
function edit(tour_index) {
  location.href = "./edit_tour_form.html?tour_index=" + tour_index;
  // location.href = "./edit_tour_form.html"
}

function addSite(tour_id) {
  let str;

  str = str + '<form id="add_site" name="tour_form" method="PUT">';
  str =
    str +
    '<div id="name-group" class="form-group"> <label for="name"> Site Name</label> <input type="text" class="form-control" name="name" id="name" placeholder="Enter site name"required/></div>';
  str =
    str +
    '<div id="name-group" class="form-group"> <label for="country"> Site country</label> <input type="text" class="form-control" name="country" id="country" placeholder="Enter country name"required/></div>';
  str =
    str + "<button onclick=\"andle_add_site('" + tour_id + "')\"> add</button>";
  str = str + "</form>";

  $("#" + tour_id).html(str);
}

function andle_add_site(tour_id) {
  let path = [];

  let site = {
    name: $("#name").val(),
    country: $("#country").val(),
  };
  path = json_array[tour_id].path;
  path.push(site);

  $.ajax({
    type: "POST", // define the type of HTTP verb we want to use (POST for our form)
    url: "/createSiteInPath/" + json_array[tour_id]._id, // the url where we want to POST
    contentType: "application/json",
    data: JSON.stringify({
      name: $("#name").val(),
      country: $("#country").val(),
    }),
    processData: false,
    // dataType: 'json', // what type of data do we expect back from the server
    encode: true,
    success: function (data) {
      location.href = "/";
    },
    error: function (errorThrown) {
      alert(errorThrown);
    },
  });
}

//////////////////////        sorts       ///////////////////

function sort_by_name_small_to_big() {
  json_array.sort((a, b) => a[1].id.localeCompare(b[1].id));
  show_tours();
}

function sort_by_name_big_to_small() {
  json_array.sort((a, b) => b[1].id.localeCompare(a[1].id));
  show_tours();
}

function sort_by_duration_small_to_big() {
  json_array.sort(function (a, b) {
    return a[1].duration - b[1].duration;
  });
  show_tours();
}

function sort_by_duration_big_to_small() {
  json_array.sort(function (a, b) {
    return b[1].duration - a[1].duration;
  });
  show_tours();
}

function sort_by_price_small_to_big() {
  json_array.sort(function (a, b) {
    return a[1].price - b[1].price;
  });
  show_tours();
}

function sort_by_price_big_to_small() {
  json_array.sort(function (a, b) {
    return b[1].price - a[1].price;
  });
  show_tours();
}

function sort_by_date_small_to_big() {
  json_array.sort(function (a, b) {
    let arr1 = a[1].start_date.split("-");
    let arr2 = b[1].start_date.split("-");

    let time1 = new Date(arr1[2], arr1[1] - 1, arr1[0]);
    let time2 = new Date(arr2[2], arr2[1] - 1, arr2[0]);

    return time1 - time2;
  });

  show_tours();
}

function sort_by_date_big_to_small() {
  json_array.sort(function (a, b) {
    let arr1 = a[1].start_date.split("-");
    let arr2 = b[1].start_date.split("-");

    let time1 = new Date(arr1[2], arr1[1] - 1, arr1[0]);
    let time2 = new Date(arr2[2], arr2[1] - 1, arr2[0]);

    return time2 - time1;
  });
  show_tours();
}

//////////////////////        end sorts       ///////////////////

//
function deleteGuide() {

  let guide_flag = false;

  for (let j = 0; j < guidesArray.length; j++) {
    if (json_array[j].guide._id == $("#guide_name").val()) {
      guide_flag = true;
    }
  }

  if (guide_flag == true) {
    alert(
      "Can't delete guide because he is guide tours, if you want to delete guide please delete all the tours he is guide"
    );
    return;
  } 
  else {
    $.ajax({
      type: "DELETE", // define the type of HTTP verb we want to use (POST for our form)
      url: "/deleteGuide/" + $("#guide_name").val(), // the url where we want to POST
      contentType: "application/json",
      processData: false,
      // dataType: 'json', // what type of data do we expect back from the server
      encode: true,
      success: function () {
        // location.href = "/main";

        alert("giude: " + $("#guide_name").val() + " had been delete");
        show_tours();
        displayGuides();
      },
      error: function (errorThrown) {
        console.log(errorThrown);
      },
    });
  }
}

function getGuides() {
  let res = $.ajax({
    type: "GET",
    url: "/getGuides",
    dataType: "json",
    success: function (data) {
      guidesArray = data;
      displayguides();
    },
    error: function (err) {
      console.log("err", err);
    },
  });
  return res;
}

function displayguides() {
  for (let i = 0; i < guidesArray.length; i++) {
    const guide = $("<option></option>")
      .text(guidesArray[i].guide_name)
      .val(guidesArray[i]._id);
    $("#guide_name").append(guide);
  }
}
