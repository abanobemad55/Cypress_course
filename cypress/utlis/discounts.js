import {adminLogin, clinicManagerLogin, logout} from "./login";

export const getB1G1patient2CouponCode = (bookingId)=>{
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
            return response.body.coupon
        }
    )

}