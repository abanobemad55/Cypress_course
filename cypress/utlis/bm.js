import {adminLogin} from "./login";

export const confirmBooking = (phoneNumber, patientName)=>{
    cy.visit('https://bandar.stagefelbayt.com/dashboards/bookings-management/')
    cy.contains(phoneNumber).first().click()
    cy.get("#confirmedDropDownButton").click()
    cy.get(".overlay-options-container").contains("Appointment").click()
    const day_of_month = new Date().getDate()
    cy.get("button").contains(day_of_month).click()
    cy.get("#hourtimeDropDownButton").click()
    cy.get("#hourtimeDropdownOverlay").contains("01").click()
    cy.get("#minutetimeDropDownButton").click()
    cy.get("#minutetimeDropdownOverlay").contains("00").click()
    cy.get("#ampmtimeDropDownButton").click()
    cy.get("#ampmtimeDropdownOverlay").contains("AM").click()
    cy.get("[type=submit]").contains("Save Changes").click()
    cy.contains("Success!")

}