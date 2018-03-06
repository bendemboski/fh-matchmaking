import Ember from 'ember';

export default Ember.Component.extend({
});

function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("resident-name-input");
  filter = input.value.toUpperCase();
  table = document.getElementById("resident-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


function myFunction() {
    var x = document.getElementById("cwk-note");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
