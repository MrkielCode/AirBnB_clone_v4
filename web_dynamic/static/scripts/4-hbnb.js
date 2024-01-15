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

$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            const placeSection = $('.places');
            $.each(data, function (index, place) {
                const article = $('<article></article>');
                article.html(`
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">
                        ${place.description}
                    </div>
                `);
                placeSection.append(article);
            });
        },
        error: function (error) {
            console.error('Error fetching places:', error);
        }
    });
});

$(document).ready(function () {
    $('#searchBtn').click(function () {
        // Get the list of checked amenities
        const selectedAmenities = $('input[type=checkbox]:checked').map(function () {
            return $(this).data('id');
        }).get();

        // Make a POST request to places_search with the list of checked amenities
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: selectedAmenities }),
            success: function (data) {
                const placeSection = $('.places');
                placeSection.empty(); // Clear existing places

                $.each(data, function (index, place) {
                    const article = $('<article></article>');
                    article.html(`
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    `);
                    placeSection.append(article);
                });
            },
            error: function (error) {
                console.error('Error fetching places:', error);
            }
        });
    });
});

