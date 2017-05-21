const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
// const app = require('./../server').app;
// const Todo = require('./../models/todo').Todo;
const {todos, populate, users, populateUsers} = require('./seed/seed');
beforeEach(populateUsers);
beforeEach(populate);

describe('POST /todos', ()=>{
  it('should create a new todo', (done)=>{
    var todo = 'Test todo text';
    request(app)
      .post('/todos')
      .send({todo})
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo).toBe(todo);
      })
      .end((err, res)=>{
        if (err) {
          return done(err);
        }

        Todo.find({todo}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].todo).toBe(todo);
          done();
        }).catch((err) => done(err));
      });
  })

  it('should not add todo w/ bad data', (done)=>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res)=>{
        if (err) {
          return done(err);
        }

        Todo.find().then((todos)=>{
          expect(todos.length).toBe(3);
          done();
        }).catch((err) => done(err));
      });
  })
}); //end POST

describe('GET /todos', ()=>{
  it('should get all todos', (done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
}); //end GET

describe('GET /todos/:id', () => {
  it('should return todo doc', (done)=>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.text.todo).toBe(todos[0].todo);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done)=>{
    var fakeId = new ObjectID();
    request(app)
      .get(`/todos/${fakeId.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done)=>{
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });
})

describe('DELETE /todos/:id', ()=>{
  it('should be able to delete an existing todo', (done)=>{
    const id = todos[0]._id.toHexString();
    console.log(id);
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((data)=>{
        expect(data.body.todo._id).toBe(todos[0]._id.toHexString());
      })
      .end((err, res)=>{
        if (err) {
          return done(err);
        }
        Todo.findById(id).then((result)=>{
            expect(result).toNotExist();
            done();
        }).catch((err)=> done(err));// end todo
      })//end end
  });

  it('should return 404 if id isn\'t valid', (done)=>{
    var id = "123";
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if id is valid but do not exist', (done)=>{
    var id = '591ac177daf41b001163568b';
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });
});//end DELETE /todos/:id

describe('PATCH /todos/:id', ()=>{
  it("should change existing todo's text and completedAt" , (done)=>{
    const _id = todos[2]._id.toHexString();
    const todo = "TESTING";
    request(app)
      .patch(`/todos/${_id}`)
       .send({
        completed: true,
        todo
      })
      .expect(200)
      .expect((result)=>{
          expect(result.body.todo).toBe(todo);
          expect(result.body.completed).toBe(true);
          expect(result.body.completedAt).toBeA('number');
      })
      .end(done); //end end
  });
  it("should clear completedAt when todo isn't completed", (done)=>{
     const _id = todos[2]._id.toHexString();
     const todo = "Just a test";
     request(app)
      .patch(`/todos/${_id}`)
      .send({
        completed: false,
        todo
      })
      .expect(200)
      .expect((data)=>{
          expect(data.body.todo).toBe(todo);
          expect(data.body.completed).toBe(false);
          expect(data.body.completedAt).toNotExist();
      })
      .end(done); //end end
  });
});// end PATCH /todos/:id

describe('GET /users/me', ()=>{
  it('should return user from sent x-auth token', (done)=>{
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((data)=>{
        expect(data.body._id).toBe(users[0]._id.toHexString());
        expect(data.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('it should return 401 if not authenticated', (done)=>{
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((data)=>{
        expect(data.body).toEqual({});
      })
      .end(done);
  });
});

describe('POST /users', (done)=>{
  it('should create a user', (done)=>{
    var email = 'example@example.com';
    var password = 'testtest';
    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((data)=>{
        expect(data.headers['x-auth']).toExist();
        expect(data.body._id).toExist();
        expect(data.body.email).toBe(email);
      })
      .end((err, res)=>{
        if(err){
          return done(err);
        }
        User.findOne({email}).then((result)=>{
          expect(result).toExist();
          expect(result.password).toNotBe(password);
          done();
        })
      });
  });
  it('should return errors if req is invalid', (done)=>{
    email = 'notavalidemail'
    var password = '1234567'; //invalid password
    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done)
  });
  it('should not create user if email already in use', (done)=>{
    var email = users[0].email ; //already taken
    var password = 'whatever';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });

});
