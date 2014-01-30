$(function () {
    $.widget("jquery.ui.autocomplete", $.ui.autocomplete, {
        _renderItem: function (ul, item) {
            console.log('custom render');
            return $('<li>')
                .attr('data-value', item)
                .append($('<a>').text(item))
                .appendTo(ul);
        }
    });

    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];


    $("#textbox").autocomplete({
        source: availableTags,
        select: function () {
            $('#textbox').blur();
        }
    }).data("autocomplete")._renderItem = renderListItem;
});

$("#PlanIDAuto").autocomplete({
    source: function (request, response) {
        var PlanIDAutoSource = [];
        var MatchIndex = 0;
        PlanIDDropdown.children("option").each(function (i, elem) {
            var OptElem = $(elem);
            if (i > 0 && OptElem.text().toLowerCase().indexOf(request.term.toLowerCase()) >= 0 && MatchIndex < 10) {
                PlanIDAutoSource.push({
                    value: OptElem.text(),
                    planid: OptElem.val()
                });
                MatchIndex++;
            }
        });

        response(PlanIDAutoSource);
    },
    select: function (event, ui) {
        PlanIDDropdown.children("option").each(function (i, elem) {
            if (elem.value == ui.item.planid) {
                document.getElementById("PlanID").selectedIndex = elem.index;
                LoadPlanDetail();
                $('#PlanIDAuto').blur();
            }
        });
    }
}).data("autocomplete")._renderItem = renderAutocompleteItem;



