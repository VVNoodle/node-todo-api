const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
// const app = require('./../server').app;
// const Todo = require('./../models/todo').Todo;

beforeEach((done)=>{
  Todo.remove({}).then(()=>done());
});

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

        Todo.find().then((todos)=>{
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
          expect(todos.length).toBe(0);
          done();
        }).catch((err) => done(err));
      });
  })
});
