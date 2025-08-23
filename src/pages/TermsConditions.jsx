import { useGetTermQuery } from '../features/rule/ruleApi';

const TermsConditions = () => {
  const { data: terms, isLoading, isError } = useGetTermQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading terms and conditions...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error loading terms and conditions</div>
      </div>
    );
  }

  // Access the content from the terms data
  const termContent = terms?.data?.content;

  return (
    <div className="terms-conditions-container p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className='text-2xl md:text-3xl font-medium border-b-2 pb-3 mb-4 md:mb-6'>Terms and Conditions</h1>
      <div className="terms-content pt-4 prose max-w-none">
        {/* Render HTML content safely */}
        {termContent ? (
          <div
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: termContent }}
            style={{
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              lineHeight: '1.6'
            }}
          />
        ) : (
          <p className="text-center text-gray-500">No terms and conditions available.</p>
        )}
      </div>
    </div>
  );
};

export default TermsConditions;