import bookingsData from '../fixtures/booking.json'
import credentials from '../fixtures/authentication.json'
import moment from "moment";
import {clinicManagerLogin, logout} from "./login";
import patientsData from "../fixtures/patients.json";

let bookingHash = null;
let bookingId = null;
export var patient2CouponCode = null;

export const normal_booking = (doctorSlug = bookingsData.normalBookingDoctor.slug, patientData = bookingsData.patient1) => {
    cy.visit(doctorSlug)
    cy.contains("Book Now").click()
    cy.contains("Clinic Visit").click()
    cy.get("[name='number']").type(patientData.phoneNumber)
    cy.get("[name='pin']").type("1234")
    cy.contains("Verify your Number").click()
}

export const createBooking = (patientName = "Test User", patientPhoneNumber = credentials.normalUserWithPhone.phoneNumber, B1G1=false) => {
    const accessToken = localStorage.getItem('accessToken')
    const payload = {
        "model": "doctor",
        "patient_name": patientName,
        "patient_phone_no": patientPhoneNumber,
        "resource_id": 6858,
        "source": "Patient",
        "nationality": "Nationality",
        "manager_id": 171,
        "offer_list": [],
        "for_self": true,
        "gender": "Male",
        "new_patient": false,
        "patient_id": null,
        "visit_type": "clinic",
        "no_show_booking": false,
    }
    if (B1G1){
        payload["discount_code"] = bookingsData.BuyOneGetOneDiscountInfo.discount_code
        payload["resource_id"] = bookingsData.BuyOneGetOneDiscountInfo.doctor_id
    }
    cy.request({
            method: 'POST',
            url: `${Cypress.env('backend_url')}/doctor/api/create_booking/`,
            body: payload,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'x-requested-with': 'XMLHttpRequest'
            }
        }
    ).then(
        (response) => {
            bookingHash = response.body.confirmation_id;
            bookingId = response.body.id;
            logout()
        }
    )
}

export const confirmBooking = () =>{
    let handledOn = moment().format('D MMM YYYY H:mm:ss:000000')
    let confirmedDate = moment().add(1, 'days').format('D MMM YYYY 14:00:00:000000')
    const payload = {
        "updateBooking": true,
        "handledOn":handledOn,
        "bookingID": bookingId,
        "status": "Confirmed",
        "noShow": false,
        "subStatus": 1,
        "confirmedDate": confirmedDate,
        "clinicId": 3
    }
    clinicManagerLogin()
    cy.request({
            method: 'POST',
            url: `${Cypress.env('backend_url')}/dashboards/api/bookings-management/`,
            body: payload,
        }
    ).then(
        (response) => {
            logout()
        }
    )
}

export const visitBookingReviewPage = () => {
    cy.visit(`/submit_review/${bookingHash}`)
}

export const getB1G1patient2CouponCode = ()=>{
    const payload = {
        "booking_id": bookingId,
    }
    cy.request({
            method: 'POST',
            url: `${Cypress.env('backend_url')}/bookings/get_b1g1_coupon/`,
            body: payload,
        }
    ).then(
        (response) => {
            patient2CouponCode =  response.body.coupon
        }
    )

}

export const getPatient = (patientType)=>{
    const locale  = 'qatar'
    return patientsData[locale][patientType]

}