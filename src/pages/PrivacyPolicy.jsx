import { useGetPrivacyQuery } from '../features/rule/ruleApi';

const PrivacyPolicy = () => {
  const { data: Privacy, isLoading, isError } = useGetPrivacyQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading Privacy Policy...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error loading Privacy Policy</div>
      </div>
    );
  }

  // Access the content from the privacy policy data
  const privacyContent = Privacy?.data?.content;

  return (
    <div className="privacy-policy-container p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className='text-2xl md:text-3xl font-medium border-b-2 pb-3 mb-4 md:mb-6'>Privacy Policy</h1>
      <div className="privacy-content pt-4 prose max-w-none">
        {/* Render HTML content safely */}
        {privacyContent ? (
          <div
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: privacyContent }}
            style={{
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              lineHeight: '1.6'
            }}
          />
        ) : (
          <p className="text-center text-gray-500">No Privacy Policy available.</p>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;