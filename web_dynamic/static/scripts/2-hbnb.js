$(document).ready(function () {
    let checkedAmenities = {}
    $('.amenities').on('change', 'input[type="checkbox"]', function() {
        let amenityId = $(this).data('id');
        let amenityName = $(this).data('name');

        if($(this).prop('checked')) {
            checkedAmenities[amenityId] = amenityName;
        } else {
            delete checkedAmenities[amenityId]
        }

        updateAmenitiesList();
    })
    function updateAmenitiesList() {
        let amenitiesList = Object.values(checkedAmenities).join(', ');
        if (amenitiesList.length > 28) {
            amenitiesList = amenitiesList.substring(0, 28) + '...';
        }
        $('.amenities h4').text(amenitiesList);
    }
});

$(document).ready(function () {
    $.get("http://127.0.0.1:5001/api/v1/status/", function(data) {
        if(data.status == "OK") {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});