import loadingGif from "../../images/pyramidSpinning.gif";

const Loading = () => {
  return (
    <section id="loading">
      <h1>Loading...</h1>
      <img src={loadingGif} alt="loading" />
    </section>
  );
};

export default Loading;
