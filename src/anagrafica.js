$(document).ready(function () {
  const columns = [
    {
      data: "id",
      title: "Id",
      type: "readonly",
    },
    {
      data: "RagioneSociale",
      title: "Ragione Sociale",
    },
    {
      data: "Indirizzo",
      title: "Indirizzo",
    },
    {
      data: "Citta",
      title: "Citta",
    },
    {
      data: "Prov",
      title: "Provincia",
    },
    {
      data: "CAP",
      title: "CAP date",
    },
    {
      data: "PIVA",
      title: "PIVA",
    },
    {
      data: "CF",
      title: "CF",
    },
    {
      data: "Telefono",
      title: "Telefono",
    },
    {
      data: "Fax",
      title: "Fax",
    },
    {
      data: "Email",
      title: "Email",
    },
    {
      data: null,
      title: "Actions",
      name: "Actions",
      render: function (data, type, row, meta) {
        return (
          '<div class="container-flex"> <a class="editbutton myBtn btnBlue" href="#">Modify</a>' +
          '<a class="delbutton myBtn btnRed" href="#">Delete</a> </div>'
        );
      },
      disabled: true,
    },
  ];

  var myTable;

  myTable = $("#example").DataTable({
    sPaginationType: "full_numbers",
    columns: columns,
    dom: "Bfrtip",
    select: {
      style: "single",
      toggleable: false,
    },
    ajax: {
      url: " http://localhost:3000/anagrafica",
      type: "GET",
      dataSrc: "",
      dataType: "json",
    },
    responsive: true,
    altEditor: true,
    buttons: [],
  });

  // Edit
  $(document).on("click", "[id^='example'] tbody ", "tr", function () {
    var tableID = $(this).closest("table").attr("id"); // id of the table
    var that = $("#" + tableID)[0].altEditor;
    that._openEditModal();
    $("#altEditor-edit-form-" + that.random_id)
      .off("submit")
      .on("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        that._editRowData();
      });
  });

  // Delete
  $(document).on("click", "[id^='example'] .delbutton", "tr", function (x) {
    var tableID = $(this).closest("table").attr("id"); // id of the table
    var that = $("#" + tableID)[0].altEditor;
    that._openDeleteModal();
    $("#altEditor-delete-form-" + that.random_id)
      .off("submit")
      .on("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        that._deleteRow();
      });
    x.stopPropagation(); //avoid open "Edit" dialog
  });

  // Add row
  $("#addbutton").on("click", function () {
    var that = $("#example")[0].altEditor;
    that._openAddModal();
    $("#altEditor-add-form-" + that.random_id)
      .off("submit")
      .on("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        that._addRowData();
      });
  });
});
