import credentials from "../fixtures/authentication.json"

export const loginByEmail = (email = credentials.normalUserWithEmail.email, password = credentials.normalUserWithEmail.password) => {
    cy.visit('login/');
    cy.contains('With Email').click()
    cy.get("[type='email']").type(email)
    cy.get("[type='password']").type(password)
    cy.xpath("//*[@type='submit'][@class='btn btn-primary form-submit-primary']").click({force: true})
}

export const loginByOTP = (phoneNumber = credentials.normalUserWithPhone.phoneNumber) => {
    cy.visit('login/');
    cy.contains('With Phone').click()
    cy.get("[name='number']").type(phoneNumber)
    cy.get("[name='pin']").type("1234")
    cy.get("[type='submit']").contains('Log in').click()
}

export const adminLogin = (email = credentials.admin.email, password = credentials.admin.password) => {
    cy.visit(`${Cypress.env('backend_url')}/login/?next=/a/abu/bandar/`)
    cy.get("[type='email']").type(email)
    cy.get("[type='password']").type(password)
    cy.get("[type='submit']").contains('Log in').click()
}

export const clinicManagerLogin = (email = credentials.ClinicManager.email, password = credentials.ClinicManager.password) => {
    cy.visit(`${Cypress.env('backend_url')}/login/?next=/a/abu/bandar/`)
    cy.get("[type='email']").type(email)
    cy.get("[type='password']").type(password)
    cy.get("[type='submit']").contains('Log in').click()
}

export const logout = ()=>{
    cy.clearCookies()
    cy.clearLocalStorage()
}