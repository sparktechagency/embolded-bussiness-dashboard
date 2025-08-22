import { useGetTermQuery } from '../features/rule/ruleApi';

const TermsConditions = () => {
  const { data: terms, isLoading, isError } = useGetTermQuery();

  if (isLoading) {
    return <div>Loading terms and conditions...</div>;
  }

  if (isError) {
    return <div>Error loading terms and conditions</div>;
  }

  // Access the content from the terms data
  const termContent = terms?.data?.content;

  return (
    <div className="terms-conditions-container p-4">
      <h1 className='text-3xl font-medium border-b-2 pb-3'>Terms and Conditions</h1>
      <div className="terms-content pt-4">
        {/* Render HTML content safely */}
        {termContent ? (
          <div dangerouslySetInnerHTML={{ __html: termContent }} />
        ) : (
          <p>No terms and conditions available.</p>
        )}
      </div>
    </div>
  );
};

export default TermsConditions;