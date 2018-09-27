var config = {
    apiKey: "AIzaSyAb8082owYSAtGobZboSl4WP6o4wvrp1g0",
    authDomain: "test-database-fa18b.firebaseapp.com",
    databaseURL: "https://test-database-fa18b.firebaseio.com",
    projectId: "test-database-fa18b",
    storageBucket: "test-database-fa18b.appspot.com",
    messagingSenderId: "395587426252"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#empSubmit").on("click", function () {
    event.preventDefault();
    var name = $("#empName").val();
    var role = $("#position").val();
    var date = $("#startDate").val();
    var monthRate = $("#monthRate").val();

    database.ref().push({
        name: name,
        role: role,
        date: date,
        monthRate: monthRate,
    })

    $("#empName").val("");
    $("#position").val("");
    $("#startDate").val("");
    $("#monthRate").val("");

})

database.ref().on("child_added", function (snapshot) {


    var startDate = snapshot.val().date;
    var months = moment().diff(startDate, "months");
    var monthRate = snapshot.val().monthRate;
    var totalBill = months * monthRate;

    var newRow = $("<tr>")
    var nameCol = $("<td>").text(snapshot.val().name);
    var roleCol = $("<td>").text(snapshot.val().role);
    var dateCol = $("<td>").text(startDate);
    var monthCol = $("<td>").text(months);
    var incomeCol = $("<td>").text(monthRate)
    var billCol = $("<td>").text(totalBill);


    //appending to newly created column and row
    newRow.append(nameCol, roleCol, dateCol, monthCol, incomeCol, billCol);
    $(".empTable").append(newRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});


