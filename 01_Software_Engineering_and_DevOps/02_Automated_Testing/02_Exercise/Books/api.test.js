const chai = require('chai');
const chaiHttp = require('chai-http');

// select the server file
const server = require('./server');
const e = require('express');

// Choose the assertion library
const expect = chai.expect;
chai.use(chaiHttp);

describe('Books API', () => {
  let bookId;

  // Verify Posting a Book
  it('should POST a book', (done) => {
    const book = { id: "1", title: "Test Book", author: "Test Author" };

    chai.request(server)
      .post('/books')
      .send(book)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('author');
        bookId = res.body.id;
        done();
      });
  });

  // Verify Getting All Books
  it('should GET all books', (done) => {
    chai.request(server)
      .get('/books')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('array');
        done();
      })
  });

  // Verify Getting a Single Books
  it('should GET a single book', (done) => {
    let bookId = "1";

    chai.request(server)
      .get(`/books/${bookId}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.id).to.equal(bookId);
        expect(res.body).to.have.property('title');
        expect(res.body.title).to.equal('Test Book')
        expect(res.body).to.have.property('author');
        expect(res.body.author).to.equal('Test Author')
        done();
      });
  });

  // Verify Updating a Book
  it('should PUT an existing book', (done) => {
    const updatedBook = { title: "Test Book - updated", author: "Test Author - updated" };
    let bookId = 1;

    chai.request(server)
      .put(`/books/${bookId}`)
      .send(updatedBook)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a('object');
        expect(res.body.title).to.equal('Test Book - updated');
        expect(res.body.author).to.equal('Test Author - updated');
        done();
      });
  });

  // Verify Deleting a Book
  it('should DELETE an existing book', (done) => {
    let bookId = "1";

    chai.request(server)
      .delete(`/books/${bookId}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(204);
        done();
      });
  });

  // Verify Non-Existing Book
  it('Should return 404 when trying to GET, PUT or DELETE non-existing book', (done) => {
    let bookId = 111;

    chai.request(server)
      .get(`/books/${bookId}`)
      .end((err, res) => {
        if (err) {
          return done(err())
        }
        expect(res.statusCode).to.be.equal(404)
      });

    chai.request(server)
      .put(`/books/${bookId}`)
      .send({ title: "Non existing title", author: "Non existing author" })
      .end((err, res) => {
        if (err) {
          return done(err())
        }
        expect(res.statusCode).to.be.equal(404);
      });

    chai.request(server)
      .delete(`/books/${bookId}`)
      .end((err, res) => {
        if (err) {
          return done(err())
        }
        expect(res.statusCode).to.be.equal(404);
        done();
      })
  });

});