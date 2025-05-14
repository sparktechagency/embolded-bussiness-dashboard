import { useNavigate } from "react-router-dom";
import { useSettingQuery } from "../features/settings/settingApi";
// import arrow from "./../assets/icons/arrow.svg";

const TermsConditions = () => {
  const router = useNavigate();
  const { data, isLoading, error } = useSettingQuery();

  let privacyContent = "<p>No privacy policy available.</p>"; // Default fallback
  try {
    if (data?.data?.termsOfService) {
      privacyContent = JSON.parse(data.data.termsOfService);
    }
  } catch (err) {
    console.error("Error parsing privacy policy:", err);
  }

  return (
    <section>
      {/* Header Section */}
      <div className="rounded py-[11px] pl-[16px]">
        <div className="flex items-center gap-[20px]">
          <h3 className="text-xl font-medium">Terms Of Service</h3>
        </div>
      </div>

     <h3 className="text-center pt-20">Terms and Condition here</h3>
    </section>
  );
};

export default TermsConditions;
