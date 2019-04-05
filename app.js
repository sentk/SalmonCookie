'use strict';

var table = document.getElementById('shell');

function Stores (name,minNumCust,maxNumCust,avgCookieSale){
  this.name = name,
  this.minNumCust = minNumCust,
  this.maxNumCust = maxNumCust,
  this.avgCookieSale = avgCookieSale;
}
var stores = [];
var rowData = [];
var hourTotal = [];

var westlake = new Stores('Westlake',23,65,6.3);
var seattlecenter = new Stores('Seattle Center',11,38,3.7);
var capitolhill = new Stores('Capitol Hill',20,38,2.3);
var bellevue = new Stores('Bellevue',2,16,4.6);
stores.push(westlake,seattlecenter,capitolhill,bellevue);

function getCustCount(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var storetime;
var numCust;
var numCookies;

function makeRow(store,totCookieStore) {
  totCookieStore = 0;
  for (var i = 8; i <= 20; i++) {
    numCust = getCustCount(store.minNumCust,store.maxNumCust);
    numCookies = Math.ceil(numCust * store.avgCookieSale);
    totCookieStore = totCookieStore + numCookies;
    rowData.push('<td>' + numCookies + '</td>');
    if (isNaN(hourTotal[i])) {
      hourTotal[i] = numCookies ;
    }
    else {
      hourTotal[i] = hourTotal[i] + numCookies ;
    }
  }
  return totCookieStore;
  }
function render(tableRow) {
  for (var j=0; j < tableRow.length; j++) {
    var newRow = document.createElement('td');
    newRow.innerHTML = tableRow[j];
    table.appendChild(newRow);
  }
}

rowData = [];
rowData.push('<td>' + 'Store'+ '</td>');
for (var i = 8; i <= 20; i++) {
  if (i < 12) {
    storetime = i + ' am';
  }
  else if (i===12) {
    storetime = i + ' pm';
  }
  else if (i > 12) {
    storetime = (i-12) + ' pm';
  }
  rowData.push('<td>' + storetime + '<td>');
}
rowData.push('<td>' + 'Daily Location Total'+ '<td>');
render(rowData);
var newRow = document.createElement('tr');
newRow.innerHTML = ' ';
table.appendChild(newRow);

var storeCount = 0;
while (storeCount < stores.length) {
  rowData = [];
  rowData.push('<td>' + stores[storeCount].name + '</td>');
  var totRow = makeRow(stores[storeCount]);

  rowData.push('<td>' + totRow + '</td>');
  render(rowData);
  newRow = document.createElement('tr');
  newRow.innerHTML = ' ';
  table.appendChild(newRow);
  storeCount = storeCount + 1;
}

rowData = [];
var grandTotal = 0;
rowData.push('<td>' + 'Total'+ '</td>');
for (i = 8; i <= 20; i++) {
  rowData.push('<td>' + hourTotal[i]+ '</td>');
  grandTotal = grandTotal + hourTotal[i];
}
rowData.push('<td>' + grandTotal+ '</td>');
render(rowData);
newRow = document.createElement('tr');
newRow.innerHTML = ' ';
table.appendChild(newRow);
