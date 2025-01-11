const Footer = () => {
  return (
    <footer className="mt-auto p-4">
      <small className="text-xs text-gray-400">
        &copy; Anthony Clement <span>{new Date().getFullYear()}</span>
      </small>
    </footer>
  );
};

export default Footer;
