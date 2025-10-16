import React, { useEffect, useState } from 'react';
import matter from 'gray-matter';
import { marked } from 'marked';

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const index = await fetch('/content/news/index.json').then(res => res.json());

      const items = await Promise.all(
        index.map(async (file) => {
          const raw = await fetch(`/content/news/${file}`).then(res => res.text());
          const { data, content } = matter(raw);
          return {
            ...data,
            html: marked(content)
          };
        })
      );

      setNewsItems(items.sort((a, b) => new Date(b.date) - new Date(a.date)));
    };

    fetchNews();
  }, []);

  return (
    <ul className="grid-list">
      {newsItems.map((item, i) => (
        <li key={i}>
          <div className="blog-card has-before has-after">
            <div className="meta-wrapper">
              <div className="card-meta">
                <ion-icon name="person-outline"></ion-icon>
                <span className="span">{item.author}</span>
              </div>
              <div className="card-meta">
                <ion-icon name="folder-outline"></ion-icon>
                <span className="span">{item.category}</span>
              </div>
            </div>
            <h3 className="headline-sm card-title">{item.title}</h3>
            <time className="title-sm date" dateTime={item.date}>
              {new Date(item.date).toLocaleDateString('uk-UA')}
            </time>
            <p className="card-text" dangerouslySetInnerHTML={{ __html: item.html }} />
            <a href="#" className="btn-text title-lg">Читати далі</a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NewsSection;
