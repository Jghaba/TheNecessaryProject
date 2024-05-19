import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to TheNecessary",
  description:
    "Indulge in the art of minimalism and redefine your personal style with TheNecessary. Embrace simplicity without compromising on luxury. Explore our range and experience the essence of premium minimalist fashion.",
  keywords: "fashion, style, elegant, simple,casual",
};
export default Meta;
