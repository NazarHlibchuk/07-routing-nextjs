import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: capt.Mykhaylo Kit</p>
          <p>
            Contact us: <a href="mailto:captkit@ukr.net">captkit@ukr.net</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
