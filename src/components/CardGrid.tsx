import React from 'react';
import Link from '@docusaurus/Link';
import styles from './CardGrid.module.css';

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon?: string;
  iconSrc?: string;
}

export function Card({ title, description, href, icon, iconSrc }: CardProps) {
  return (
    <Link to={href} className={styles.card}>
      {iconSrc && (
        <div className={styles.icon}>
          <img src={iconSrc} alt="" className={styles.iconImg} />
        </div>
      )}
      {icon && !iconSrc && <div className={styles.icon}>{icon}</div>}
      <div className={styles.title}>{title}</div>
      <p className={styles.description}>{description}</p>
    </Link>
  );
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className={styles.grid}>{children}</div>;
}
