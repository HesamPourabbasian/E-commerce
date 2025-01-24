const Footer = () => {
  return (
    <footer className="footer footer-center bg-primary text-primary-content p-10 backdrop-blur-lg backdrop-saturate-180 bg-opacity-60   rounded-xl">
      <aside>
        <p className="font-bold">
          ACME Industries Ltd. hhhhhhh
          <br />
          Providing reliable tech since 1992
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
