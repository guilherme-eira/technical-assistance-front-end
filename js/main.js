import ServiceOrderView from "./ui/ServiceOrderView.js";
import ServiceOrderService from "./service/ServiceOrderService.js";

document.addEventListener("DOMContentLoaded", async() => {
    ServiceOrderView.initializeListeners();
    ServiceOrderService.loadContent();
})