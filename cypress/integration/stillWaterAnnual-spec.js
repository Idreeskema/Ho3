/// <reference types="cypress" />


describe("Test Still Water Annual", () => {
    afterEach(function() {
        if (this.currentTest.state === 'failed') {
          Cypress.runner.stop()
        }
      });

    beforeEach(function () {
        cy.fixture('example').then((testdata) => {
            this.data = testdata
            cy.viewport(1000, 660)

        })
    })
    it("Load Website", () => {
        cy.visit('https://creditoneinsurance-dev.insuranceaisle.com')
        cy.intercept('GET','/assets/data/siteData.json').as('matchedUrl')
        cy.request({ 
            method: 'GET', 
            url: '/assets/data/siteData.json'
         }).then((response) => {
            // all your assertions should be placed here!!
         //cy.log(JSON.stringify(response.body))
          
           expect(response.body).to.not.be.null;
           expect(response.status).to.eq(200)
           
           
        });
      
        cy.get('.mat-toolbar > .creditone > :nth-child(2)').click();
        cy.get('.mat-menu-content > :nth-child(1) > :nth-child(1)').click();

    })

    it("Dynamic address",function(){

    cy.get('#mat-input-0').type(this.data.address.address3).type(`{enter}`)   
   
    const street=this.data.expected.expect3;
    cy.get('.pac-container').find('.pac-item >.pac-item-query >.pac-matched').should('contain.text',street).first().click({force:true})
    //cy.get('#hero-copy > .mat-focus-indicator > .mat-button-wrapper').click({multiple:true});
    for(let n = 0; n < 3; n ++){
    cy.get('#hero-copy > .mat-focus-indicator > .mat-button-wrapper').contains(' Get Started ').click({multiple:false})
    
  }
})
it("How soon will you need coverage?",function(){


  cy.get('app-needcoverage.ng-star-inserted > .cont-rad > :nth-child(1) > .btn').click();
cy.get('#continuebtn').click();
})

it("Got it. And why are you shopping for insurance today?",function(){
  cy.get('#mat-radio-2').click();
  cy.get('#continuebtn').click();
})

it("User Credentials",function(){
  cy.get('#mat-input-5').type('idrees');
  cy.get('#mat-input-6').type('kema');
  cy.get('#mat-input-7').type('08271997');;
  cy.get('#mat-input-8').type('idreeskema13@gmail.com');
  cy.get('#mat-input-9').type('8491813135');
  cy.get('div.ng-dirty > :nth-child(6) > .btnagree > :nth-child(1) > .btn').click();
  cy.get('#continuebtn').click({multiple:true});
  cy.wait(10000)
})

it("Thanks! Now lets start looking at how we can help you save...",function(){
  cy.get('app-hometype.ng-star-inserted > .cont-rad > :nth-child(1) > .mat-focus-indicator').click();
  cy.get('#continuebtn').click();
})

it("Got it. What are your plans for using this space?",function(){
  cy.get('app-homeplans.ng-star-inserted > .cont-rad > :nth-child(1) > .btn').click();
  cy.get('#continuebtn').click();
})
it("Couple quick questions about the home",function(){
//   cy.intercept('https://api2-dev.insuritas.com/auth/v2/api/router/aux/get-home-detail').as('homedetails')

//   cy.request({ 
//     method: 'GET', 
//     url: '@homedetails'
//  }).should((response) => {
//     // all your assertions should be placed here!!
//  //cy.log(JSON.stringify(response.body))
//  cy.log(JSON.stringify(response.body))

  //  expect(response.body).not.be.null
   
//});

cy.get("body").then($body => {
  if ($body.find("button[data-cy=appDrawerOpener]").length > 0) {   
    cy.get('#continuebtn').click();
  
    //evaluates as true
  }
})
})
    //     cy.get('#avatar-lily').should('be.visible');// Picture should be visible
    //     cy.get('.lily-voice').should('be.visible', this.data.firstPageData);// quote should be visible
    // });
})