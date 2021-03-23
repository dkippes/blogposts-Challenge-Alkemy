module.exports = (sequelize, dataTypes) => {
	let alias = 'Posts';
	let cols = {
	  id: {
		type: dataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	  },
	  title: {
		type: dataTypes.STRING(100),
	  },
	  content: {
		type: dataTypes.STRING(280),
	  },
	  image: {
		type: dataTypes.STRING(200),
	  },
	  created_at: {
		type: dataTypes.DATE,
	  },
	};

	let config = {
	  tableName: 'posts',
	  timestamps: false,
	};
  
	let Post = sequelize.define(alias, cols, config);
  
	Post.associate = function (models) {
		Post.belongsTo(models.Categories, {
		as: 'categories',
		foreignKey: 'category_id',
	  });
	};
  
	return Post;
};