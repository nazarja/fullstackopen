
describe('BlogList App', function () {
    it('creates a new user', function() {
        cy.request('POST', 'http://localhost:3001/api/tests/reset')
        const user = {
            name: 'Sean Murphy',
            username: 'sean',
            password: 'secret'
        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
    });

    it('front page can be opened', function () {
        cy.visit('http://localhost:3000');
        cy.contains('Blogs Application')
    });

    it('can log in user', function () {
        cy.get('#username').type('sean');
        cy.get('#password').type('secret');
        cy.get('#login-btn').click();
    });

    describe('can create blogs', function() {

        it('opens the bloglist', function() {
            cy.contains('All Blogs');
        });
        
        it('opens the create blog page', function() {
            cy.get('#create-blog').click();
        });

        it('can create a blog', function() {
            cy.get('#title').type('new blog title');
            cy.get('#author').type('A Great Man');
            cy.get('#url').type('http://google.com');
            cy.get('#create-new-blog').click();
        });

        it('contains the new post', function() {
            cy.contains('new blog title')
        });
        
        it('contains correct information', function() {
            cy.contains('Users').click();
            cy.contains('1');
        });
    });
});