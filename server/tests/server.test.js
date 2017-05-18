const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
// const app = require('./../server').app;
// const Todo = require('./../models/todo').Todo;

const todos = [{
    _id: new ObjectID(),
    todo: 'Go for a walk'
  },{
    _id: new ObjectID(),
    todo: 'eat lunch'
  }
];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
     return Todo.insertMany(todos);
  }).then(()=>done());
});

// describe('POST /todos', ()=>{
//   it('should create a new todo', (done)=>{
//     var todo = 'Test todo text';
//     request(app)
//       .post('/todos')
//       .send({todo})
//       .expect(200)
//       .expect((res)=>{
//         expect(res.body.todo).toBe(todo);
//       })
//       .end((err, res)=>{
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find({todo}).then((todos)=>{
//           expect(todos.length).toBe(1);
//           expect(todos[0].todo).toBe(todo);
//           done();
//         }).catch((err) => done(err));
//       });
//   })
//
//   it('should not add todo w/ bad data', (done)=>{
//     request(app)
//       .post('/todos')
//       .send({})
//       .expect(400)
//       .end((err, res)=>{
//         if (err) {
//           return done(err);
//         }
//
//         Todo.find().then((todos)=>{
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((err) => done(err));
//       });
//   })
// }); //end POST
//
// describe('GET /todos', ()=>{
//   it('should get all todos', (done)=>{
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res)=>{
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
// }); //end GET

// describe('GET /todos/:id', () => {
//   it('should return todo doc', (done)=>{
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect((res)=>{
//         expect(res.body.text.todo).toBe(todos[0].todo);
//       })
//       .end(done);
//   });
//
//   it('should return 404 if todo not found', (done)=>{
//     var fakeId = new ObjectID();
//     request(app)
//       .get(`/todos/${fakeId.toHexString()}`)
//       .expect(404)
//       .end(done);
//   });
//
//   it('should return 404 for non-object ids', (done)=>{
//     request(app)
//       .get('/todos/123')
//       .expect(404)
//       .end(done);
//   });
// })

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
        //query database usingg findById
        Todo.findById(id).then((result)=>{
            expect(result).toNotExist();
            done();
        }).catch((err)=>{
          done(err);
        });
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
});
