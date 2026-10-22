
/* Sample Artisan Details */

const artisans = [
    {
        name: "Ravi Kumar",
        category: "Potter",
        location: "Ottapalam, Kerala",
        description: "Traditional pottery and handmade clay pots crafted with care.",
        price: "From ₹250",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Meera Thomas",
        category: "Tailor",
        location: "Palakkad, Kerala",
        description: "Custom stitching, blouse designs and clothing alterations.",
        price: "From ₹150",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSked8SJ6vXRKzonatI-wf-ve_7twoN-xneHno9IszBSQ&s=10"
    },
    {
        name: "Arun Das",
        category: "Cobbler",
        location: "Thrissur, Kerala",
        description: "Reliable shoe repair, polishing and footwear maintenance.",
        price: "From ₹100",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Lakshmi Nair",
        category: "Artisan",
        location: "Kochi, Kerala",
        description: "Beautiful handmade crafts, decorative items and gifts.",
        price: "From ₹300",
        image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Suresh Menon",
        category: "Small Vendor",
        location: "Malappuram, Kerala",
        description: "Local products and useful everyday items for your home.",
        price: "From ₹80",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
    },
    {
        name: "Anjali Raj",
        category: "Artisan",
        location: "Kozhikode, Kerala",
        description: "Handcrafted jewellery and unique traditional accessories.",
        price: "From ₹200",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
    }
];


/* Get HTML Elements */

const artisanContainer = document.getElementById("artisanContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const categoryCards = document.querySelectorAll(".category-card");
const noResults = document.getElementById("noResults");


/* Display Artisan Cards */

function displayArtisans(artisanList) {

    artisanContainer.innerHTML = "";

    if (artisanList.length === 0) {
        noResults.hidden = false;
        return;
    }

    noResults.hidden = true;

    artisanList.forEach(function(artisan) {

        const card = document.createElement("div");
        card.className = "artisan-card";

        card.innerHTML = `
            <img
                src="${artisan.image}"
                alt="${artisan.category} - ${artisan.name}"
                class="artisan-image"
                loading="lazy"
            >

            <div class="artisan-info">

                <span class="artisan-category">
                    ${artisan.category}
                </span>

                <h3>${artisan.name}</h3>

                <p class="artisan-location">
                    📍 ${artisan.location}
                </p>

                <p class="artisan-description">
                    ${artisan.description}
                </p>

                <div class="artisan-bottom">

                    <span class="artisan-price">
                        ${artisan.price}
                    </span>

                    <button class="view-btn">
                        View Details
                    </button>

                </div>

            </div>
        `;

        const viewButton = card.querySelector(".view-btn");

        viewButton.addEventListener("click", function() {
            alert(
                "Artisan: " + artisan.name +
                "\nCategory: " + artisan.category +
                "\nLocation: " + artisan.location +
                "\nPrice: " + artisan.price +
                "\n\nDetailed profiles and booking will be added next."
            );
        });

        artisanContainer.appendChild(card);

    });
}


/* Search Artisans */

function searchArtisans() {

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredArtisans = artisans.filter(function(artisan) {

        return (
            artisan.name.toLowerCase().includes(searchText) ||
            artisan.category.toLowerCase().includes(searchText) ||
            artisan.location.toLowerCase().includes(searchText) ||
            artisan.description.toLowerCase().includes(searchText)
        );

    });

    displayArtisans(filteredArtisans);
}


/* Search Button */

searchButton.addEventListener("click", function() {
    searchArtisans();
});


/* Search When Pressing Enter */

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchArtisans();
    }

});


/* Filter by Category */

categoryCards.forEach(function(categoryCard) {

    categoryCard.addEventListener("click", function() {

        const selectedCategory = categoryCard.dataset.category;

        categoryCards.forEach(function(card) {
            card.classList.remove("active");
        });

        categoryCard.classList.add("active");

        if (selectedCategory === "All") {
            displayArtisans(artisans);
        } else {

            const filteredArtisans = artisans.filter(function(artisan) {
                return artisan.category === selectedCategory;
            });

            displayArtisans(filteredArtisans);
        }

    });

});


/* Show All Artisans When Page Loads */

displayArtisans(artisans);
