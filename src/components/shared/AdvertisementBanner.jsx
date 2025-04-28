const AdvertisementBanner = ({ onClick }) => {
    return (
      <div
        className="bg-orange-400 text-white p-3 rounded-2xl shadow-lg flex items-center justify-center my-6 animate-bounce cursor-pointer"
        onClick={onClick}
      >
        <h2 className="text-3xl font-bold">🎉 Free N5 Vocabulary! 🎉</h2>
      </div>
    );
  };
  
  export default AdvertisementBanner;
  