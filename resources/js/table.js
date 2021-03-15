// DataTables formatting

$(document).ready(function() {
    $('#table_id').dataTable( {
        "ajax": '/tableData.json',
        "columns": [
            { "data": "title" },
            { "data": "link",
                "render": function ( data, type, row, meta ) {
                    return '<a href="'+data+'">View</a>';
                }
            },{
                "data": "description"
            },{
                "data": "tags"
            }
        ]
    } );
} );