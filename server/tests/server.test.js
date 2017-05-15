const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
// const app = require('./../server').app;
// const Todo = require('./../models/todo').Todo;

const todos = [
  {todo: 'Go for a walk'},
  {todo: 'eat lunch'}
];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
     return Todo.insertMany(todos);
  }).then(()=>done());
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
          expect(todos.length).toBe(2);
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
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
}); //end GET
