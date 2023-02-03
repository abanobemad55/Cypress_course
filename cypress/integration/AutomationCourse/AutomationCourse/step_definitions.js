import {When, Then, Given} from "cypress-cucumber-preprocessor/steps";
import credentials from "../../../fixtures/authentication.json";
import {
    confirmBooking,
    createBooking,
    getB1G1patient2CouponCode,
    getPatient,
    patient2CouponCode
} from "../../../utlis/bookings";
import {DOCTORS, PAGES_PREFIX, DISCOUNTS, PATIENTS} from "../../../utlis/types";
import patients from "../../../fixtures/patients.json";
import doctors from "../../../fixtures/doctors.json";

When("I go to clinics page", () => {
    cy.visit("/clinics");
})


When("I click on {string}", (Text) => {
    cy.contains(Text).click({force: true})
})




When("I am not logged in", () => {  
    cy.visit("/") 
})

When("I Choose {string}", (Text) => {   
    cy.contains(Text).click({force: true})
})


Then("I Should see {string}", (Text) => {
    cy.contains(Text)
})

When("I Enter my Username", () => {   
    cy.xpath("//*[@id='user-name']").type("standard_user")
})

When("I Enter my Password", () => {   
    cy.xpath("//*[@id='password']").type("secret_sauce")
})

When("Press Login", () => {   
    cy.xpath("//*[@id='login-button']").click();
})











