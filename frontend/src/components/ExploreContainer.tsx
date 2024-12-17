const ExploreContainer: React.FC = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <strong className="text-2xl font-bold text-center text-gray-800">Ready to create an app?</strong>
      <p className="text-center text-gray-600">
        hello{" "}
        <a 
          className="text-blue-500 hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
    </div>
  );
};

export default ExploreContainer;
