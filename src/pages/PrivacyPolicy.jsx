import { useGetPrivacyQuery } from '../features/rule/ruleApi';

const PrivacyPolicy = () => {
  const { data: Privacy, isLoading, isError } = useGetPrivacyQuery();

  if (isLoading) {
    return <div>Loading Privacy Policy...</div>;
  }

  if (isError) {
    return <div>Error loading Privacy Policy</div>;
  }

  // Access the content from the terms data
  const termContent = Privacy?.data?.content;

  return (
    <div className="terms-conditions-container p-4">
      <h1 className='text-3xl font-medium border-b-2 pb-3'>Privacy Policy</h1>
      <div className="terms-content pt-4">
        {/* Render HTML content safely */}
        {termContent ? (
          <div dangerouslySetInnerHTML={{ __html: termContent }} />
        ) : (
          <p>No Privacy Policy available.</p>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;