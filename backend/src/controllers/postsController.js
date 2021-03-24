const db = require('../database/models');

const postsController = {

	/**
	 * "GET/posts
	*/
    getAllPosts: (req, res) => {
		db.Posts.findAll({
			order: [
				['created_at', 'DESC']
			],
			attributes: ['id', 'title', 'image', 'created_at'],
			include: [{
					association: 'categories'
				}]
		})
		.then(posts => {
			res
			.status(200)
			.json(posts);
		})
		.catch(err => {
			res
			.status(500)
			.json({
				message: 'Internal Server Error',
				err
			});
		});
    },


	/**
	 * "GET/posts:/id
	*/
	 getOnePosts: (req, res) => {
		const { id } = req.params;

		db.Posts.findByPk(id, {
			include: [{
				association: 'categories'
			}]
		})
		.then(post => {

			if(post) {
				res
				.status(200)
				.json(post);
			} else {
				res
				.status(404)
				.json({
					message: 'Post not found'
				});
			}

		})
		.catch(err => {
			res
			.status(500)
			.json({
				message: 'Internal Server Error',
				err
			});
		});
		
	 },


	/**
	 * "POST/posts
	*/
	 insertPost: (req, res) => {
		 const { title, content, image, category } = req.body;

		 if(typeof title === "undefined" ||
		 	typeof title !== "string" ||
		 	typeof content === "undefined" ||
			typeof content !== "string" ||
		 	typeof image === "undefined" ||
			typeof image !== "string" ||
			!image.match(/[^/]+(jpg|png|gif)$/) ||
		 	typeof category === "undefined" ||
			typeof category !== "string"
		 ) {
			return res
					.status(400)
					.json({
						message: 'Bad Request'
					});
		 }

		 db.Categories.create({
			name: category,
			posts: {
				title: title,
				content: content,
				image: image
			}
		 }, {
			include: [{ association: 'posts' }]
		 });

		 res
		 .status(200);
	 },


	/**
	 * "PATCH/posts/:id
	*/
	 updatePost: async (req, res) => {
		const { id } = req.params;
		const { title, content, image } = req.body;

		if(typeof title === "undefined" ||
		 	typeof title !== "string" ||
		 	typeof content === "undefined" ||
			typeof content !== "string" ||
		 	typeof image === "undefined" ||
			typeof image !== "string" ||
			!image.match(/[^/]+(jpg|png|gif)$/)
		 ) {
			return res
					.status(400)
					.json({
						message: 'Bad Request'
					});
		 }

		 try {
			const post = await db.Posts.findOne({
				where: {
					id: id
				}
			})

			if(!post) {
				return res
						.status(404)
						.json({
							message: 'Post not found'
						});
			}

			await db.Posts.update({
				title: title,
				content: content,
				image: image
			}, {
			   where: {
				   id: id
			   }
		   });

		   res
		   .status(200)
		   .json({
				message: 'Post Updated'
			});

		 } catch {

			res
			.status(500)
			.json({
				message: 'Internal Server Error'
			});

		 }
	 },


	 /**
	 * "DELETE/posts/:id
	*/
	deletePost: async (req, res) => {
		const { id } = req.params;

		try {
			const post = await db.Posts.findOne({
				where: {
					id: id
				}
			})

			if(!post) {
				return res
						.status(404)
						.json({
							message: 'Post not found'
						});
			}

			db.Posts.destroy({
				where: {
					id: id
				}
			});

			res
			.json({
				message: 'Post deleted'
			});

		} catch {

			res
			.status(500)
			.json({
				message: 'Internal Server Error'
			});
			
		}

	}
}

module.exports = postsController;