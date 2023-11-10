describe('CRUD - Posts', () => {

    let postId = ''
    let msg = 'Este post foi feito pelo Cypress'
    
    beforeEach(() => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body:{
                email: (Cypress.env('email')),
                password: (Cypress.env('password'))
            }

        })
            
    })
    
    it('cria um post', () => {
        
       
        cy.request({
           
            method:  'POST',
            url:  '/api/posts',
            body:{
                text: 'Este post foi feito pelo Cypress',
                
            }

        }).then(({status,body}) => {
            expect(status).to.eq(201)
            expect(body.text).to.eq(msg)
            postId = body._id

            
        })
    
    })

    it('lê o post', () => {
       
        cy.request({
            method:  'GET',
            url:  `/api/posts/${postId}`
        }).then(({status, body}) => {
            expect(status).to.eq(200)
            expect(body.text).to.eq(msg)
            expect(body.likes).to.have.lengthOf(0)
            
        })
        
    })

    it('atualiza o post', () => {
        
        cy.request({
            method:  'PUT',
            url:  `/api/posts/like/${postId}`,
            body:{
                text: 'Este post foi atualizado pelo Cypress'
            }
        }).then(({status}) => {
            expect(status).to.eq(200)

            cy.request({
                method:  'GET',
                url: `/api/posts/${postId}`
            }).then(({body}) => {
                expect(body.likes).to.have.lengthOf(1)
            }) 

              
        })
    })

    it('deletar post', () => {
        cy.request({
            method:  'DELETE',
            url:  `/api/posts/${postId}`
        }).then(({status, body}) => {
            expect(status).to.eq(200)
            expect(body.msg).to.eq('Post removido')

            cy.request({
                method:  'GET',
                url: `/api/posts/${postId}`,
                failOnStatusCode: false
            }).then(({status}) => {
                expect(status).to.eq(404)
                    
            })
        })
    })
            
})    
