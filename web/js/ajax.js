$( document ).ready(function() {
    $("#appbundle_contact_town").keyup(function(){
        const inputTown = $(this).val().toUpperCase();
        if ( inputTown.length >= 2 ) {
            $.ajax({
                type: "POST",
                url: "/town/list/" + inputTown,
                dataType: 'json',
                timeout: 3000,
                success: function(response){
                    const towns = JSON.parse(response.data);
                    let html = "";
                    for (town of towns) {
                        let highlightTown = town.town.replace(inputTown, `<span class="highlight">${inputTown}</span>`);
                        html += `<li class="list-group-item"><span class="town">${highlightTown}</span><span class="badge">${town.country}</span></li>`;
                    }
                    $('#autocomplete').html(html);
                    $('#autocomplete li').on('click', function() {
                        let getTown = $(this).children('span').first().text();
                        $('#appbundle_contact_town').val(getTown);
                        $('#autocomplete').html('');
                    });
                },
                error: function() {
                    $('#autocomplete').text('Ajax call error');
                }
            });
        } else {
            $('#autocomplete').html('');
        }
    });
});