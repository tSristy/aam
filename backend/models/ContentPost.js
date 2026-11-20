import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { Admin } from './Admin.js';

export const ContentPost = sequelize.define(
  'ContentPost',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.ENUM('moment', 'news'),
      allowNull: false
    },
    display_section: {
      type: DataTypes.ENUM('default', 'top_headline', 'side_headline', 'feed_story'),
      allowNull: false,
      defaultValue: 'default'
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    category: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(160),
      allowNull: true
    },
    year: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    source: {
      type: DataTypes.STRING(140),
      allowNull: true
    },
    tag: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(220),
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING(260),
      allowNull: false,
      unique: true
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    cover_image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'published'),
      allowNull: false,
      defaultValue: 'published'
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  },
  {
    tableName: 'content_posts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['type', 'status', 'created_at'] },
      { fields: ['type', 'display_section', 'status'] },
      { fields: ['type', 'is_featured', 'status'] },
      { fields: ['slug'], unique: true }
    ]
  }
);

Admin.hasMany(ContentPost, { foreignKey: 'created_by', as: 'posts', onDelete: 'SET NULL' });
ContentPost.belongsTo(Admin, { foreignKey: 'created_by', as: 'admin' });
