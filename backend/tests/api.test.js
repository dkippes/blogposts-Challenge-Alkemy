const request =  require('supertest');

const app = require('../src/app');

/**
 * "GET/posts"
 */
describe("GET /posts", () => {
	it('respond with json containing a list of all posts', done => {
		request(app)
			.get('/posts')
			.set('Accept', 'application/json') // Headers
			.expect('Content-Type', /json/) // Headers
			.expect(200)
			.end((err) => {
				if(err) return done(err);
				done();
			});
	});
});

/**
 * "GET/posts/:id"
 */
 describe("GET /posts/:id", () => {
	it('respond with code 200 containing a posts', done => {
		request(app)
			.get('/posts/27')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end((err) => {
				if(err) return done(err);
				done();
			});
	});

	it('respond with code 404 "Post not found"', done => {
		request(app)
			.get('/posts/666666')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.expect({
				message: 'Post not found'
			})
			.end((err) => {
				if(err) return done(err);
				done();
			});
	});
});

/**
 * "POST/posts"
 */
 describe("POST /posts", () => {
	it('respond with code 400 when the extension of an image is not png or jpg', done => {
		const data = {
			"title": "this is a titulo",
    		"content": "this is a new content",
    		"image": "image.",
    		"category": "this is his category"
		}
		request(app)
			.post('/posts')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});

	it('respond with code 400 if something is undefined or is not type string', done => {
		const data = {
    		"content": "this is a new content",
    		"image": "image.png",
    		"category": 3
		}
		request(app)
			.post('/posts')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
	
});

/**
 * "PATCH/posts/:id"
 */
 describe("PATCH /posts/:id", () => {
	it('respond with code 200', done => {
		const data = {
			"title": "title updated",
    		"content": "content updated",
    		"image": "image_updated.png",
		}
		request(app)
			.patch('/posts/27')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});

	it('respond with code 400 if something is undefined or is not type string', done => {
		const data = {}
		request(app)
			.patch('/posts/27')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});

	it('respond with code 404 when the post is not in the db', done => {
		const data = {
			"title": "title updated",
    		"content": "content updated",
    		"image": "image_updated.png",
		}
		request(app)
			.patch('/posts/26545')
			.send(data)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * "DELETE/posts/:id"
 */
 describe("DELETE /posts/:id", () => {

	// Recommendation: Comment the code where is deleted the post in the controller - without that it'll delete your post in your db
	it('respond with code 200', done => {
		request(app)
			.delete('/posts/27')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});

	it('respond with code 404 if the post does not exist', done => {
		request(app)
			.delete('/posts/26564654')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(404)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});