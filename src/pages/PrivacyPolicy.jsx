import { useNavigate } from "react-router-dom";
import { useSettingQuery } from "../features/settings/settingApi";
// import arrow from './../assets/icons/arrow.svg';

const PrivacyPolicy = () => {
  const router = useNavigate();
  const { data, isLoading, error } = useSettingQuery();

  let privacyContent = "<p>No privacy policy available.</p>"; // Default fallback
  try {
    if (data?.data?.privacyPolicy) {
      privacyContent = JSON.parse(data.data.privacyPolicy);
    }
  } catch (err) {
    console.error("Error parsing privacy policy:", err);
  }

  return (
    <section className="border p-4 rounded-lg mt-4 ">
      {/* Header Section */}
      <div className="rounded">
        <div className="flex items-center gap-[20px]">
          <h3 className="text-xl font-medium text-primary">Privacy Policy</h3>
        </div>
      </div>

      <div className="flex justify-center h-[700px] items-center p-4">
        {/* <div
          className="mt-8"
          dangerouslySetInnerHTML={{ __html: privacyContent }}
        /> */}

        <img src="/images/nodata.png" alt="no data" />
      </div>
    </section>
  );
};

export default PrivacyPolicy;
