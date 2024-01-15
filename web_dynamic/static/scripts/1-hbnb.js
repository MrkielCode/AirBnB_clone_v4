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
