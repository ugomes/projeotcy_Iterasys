describe('API Profile', () => {
    context('todos os perfis', () => {
        it('valida a API de perfis', () => {
            cy.log('Teste de Texto')
            cy.request({
                method: 'GET',
                url:'/api/profile'
            }).then (({ status,duration,body,headers}) => {
                expect(status).to.eq(200)
                expect(duration).to.be.lessThan(10000)
                expect(body[0].status).to.be.eq('QA Junior')
                expect(body[0].company).to.be.eq('Uelton SA')
                expect(body[0].website).to.be.eq('https://www.uelton.gomes.com.br')
                expect(body[0].skills).to.have.length(1)
                expect(body[0].date).not.to.be.null
                expect(headers['x-powered-by']).to.eq('Express')
            })
            
        })
        
    })
    
    context('perfil especifico', () => {
        it('seleciona um usuário inválido', () => {
            cy.request({
                method:'GET',
                url: 'api/profile/user/1',
                failOnStatusCode:false

            }).then (({status,body}) => {
                expect(status).to.eq(404)
                expect(body.errors[0].msg).to.eq('Perfil não encontrado')
            })
            
        })

        it('valida usuário válido', () => {
            let usuarioId = '6548c671e062b63e542a3592'

            cy.request({
                method: 'GET',
                url:`api/profile/user/${usuarioId}`
            }).then(({ status,body}) => {
                expect(status).to.eq(200)
                expect(body.user.name).to.be.eq('Uelton Santos Gomes')
                expect(body.company).to.be.eq('Uelton SA')
            })
        
        })
    })
})