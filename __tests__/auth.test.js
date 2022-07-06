const request=require('supertest')
const app=require('../app')

describe('User Routes Testing',()=>{
    
    //Must pass as all details are given
    test('It validates user registration', async() => { 
        const user={
            username:'kinzakiran',
            password:'kinzakiran1_',
            mobile:'03001112223',
            religion:1
        }

        const res=await request(app).post('/api/register-user').send(user);
        expect(res.body.success).toBe(true)
    })
    //This must fail, password is required but not provided
    test('It validates new user registration', async() => { 
        const user={
            username:'kiran',
            mobile:'03001112223',
            religion:1,
        }
        let res = await request(app).post('/api/register-user').send(user)
        expect(res.body.success).toBe(true)
              
    })
    //This must fail, Duplicate Users not allowe
    test('It validates user duplication', async() => { 
        const user={
            username:'kiran',
            mobile:'03001112223',
            religion:1,
            password:1313
        }
        let res = await request(app).post('/api/register-user').send(user)
        expect(res.body.success).toBe(false)
            
    })
})
