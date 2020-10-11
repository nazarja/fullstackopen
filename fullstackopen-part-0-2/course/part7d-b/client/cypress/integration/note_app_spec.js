describe('Note app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Sean Murphy',
            username: 'Sean',
            password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Notes')
    })

    describe('when logged in', function () {

        beforeEach(function () {
            cy.contains('Login')
                .click()
            cy.get('#username')
                .type('Sean')
            cy.get('#password')
                .type('secret')
            cy.contains('Submit')
                .click()
        })

        it('name of the user is shown', function () {
            cy.contains('Sean Murphy logged in')
        })

        it('a new note can be created', function () {
            cy.contains('Create New Note')
                .click()
            cy.get('input')
                .type('a note created by cypress')
            cy.contains('save')
                .click()
            cy.contains('a note created by cypress')
        });
    });

    describe('and a note is created', function () {
        beforeEach(function () {
            cy.contains('Create New Note')
                .click()
            cy.get('input')
                .type('another note cypress')
            cy.contains('save')
                .click()
        })

        it('it can be made important', function () {
            cy.contains('another note cypress')
                .contains('make important')
                .click()

            cy.contains('another note cypress')
                .contains('make not important')
        });
    });
});