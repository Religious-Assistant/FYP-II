const request=require('supertest')
const app=require('../app')

describe('User Routes Testing',()=>{
    
    //Must pass as all details are given
    // test('It validates user registration', async() => { 
    //     const user={
    //         username:'kinzakiran',
    //         password:'kinzakiran1_',
    //         mobile:'03001112223',
    //         religion:1
    //     }

    //     const response=await request(app).post('/api/register-user').send(user);
    //     console.log(response.body)
    // })
    //This must fail, password is required but not provided

    test('It validates user registration', async() => { 
        const user={
            username:'kinzakiran',
            mobile:'03001112223',
            religion:1
        }
        await request(app).post('/api/register-user').send(user)
            
    })
})
