

function selectService(category) {
    document.getElementById("serviceCategory").value = category;

    document.getElementById("requestFormSection").scrollIntoView({
        behavior: "smooth"
    });
}


const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

document.getElementById("preferredDate").min =
    `${year}-${month}-${day}`;


document.getElementById("serviceRequestForm").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const request = {
            name: document.getElementById("customerName").value,
            email: document.getElementById("customerEmail").value,
            phone: document.getElementById("customerPhone").value,
            category: document.getElementById("serviceCategory").value,
            location: document.getElementById("serviceLocation").value,
            description: document.getElementById("serviceDescription").value,
            date: document.getElementById("preferredDate").value,
            budget: document.getElementById("serviceBudget").value
        };

        
        let requests = JSON.parse(
            localStorage.getItem("hunarhubRequests")
        ) || [];

        requests.push(request);

        localStorage.setItem(
            "hunarhubRequests",
            JSON.stringify(requests)
        );

        

        
        document.getElementById("preferredDate").min =
            `${year}-${month}-${day}`;
    }
);
