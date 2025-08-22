import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useGetProfileQuery, useUpdateProfileMutation } from '../../features/settings/settingApi';
import { baseURL } from '../../utils/BaseURL';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPhoneReadOnly, setIsPhoneReadOnly] = useState(false);
  const { data: user, isLoading: getProfileLoading, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();

  console.log(user?.data?.profileImage)

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://i.ibb.co.com/fYrFP06M/images-1.png"
  );

  useEffect(() => {
    if (user?.data) {
      setProfile({
        name: user.data.name || "",
        email: user.data.email || "",
        phone: user.data.phone || "",
      });

      setPreviewImage(
        user?.data?.profileImage ? `${baseURL}${user?.data?.profileImage}` :
          "https://i.ibb.co.com/fYrFP06M/images-1.png"
      );
    }
  }, [user]);

  const handleFileChange = ({ file }) => {
    if (!isEditing) return;

    // Handle both file object and file list
    const fileObj = file.originFileObj || file;

    if (!fileObj) return;

    // Check file type
    const isImage = fileObj.type.startsWith('image/');
    if (!isImage) {
      message.error('Please upload an image file');
      return;
    }

    // Check file size (limit to 5MB)
    const isLt5M = fileObj.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = () => {
      setPreviewImage(reader.result);
      setProfileImageFile(fileObj);
    };
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const phonePattern = /^[0-9]{10,15}$/;

    if (!profile.phone) {
      message.error("Phone number is required");
      return;
    }

    if (!phonePattern.test(profile.phone)) {
      message.error("Please enter a valid phone number");
      return;
    }

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);

    if (profileImageFile) {
      formData.append("profileImage", profileImageFile);
    }

    try {
      const result = await updateProfile(formData).unwrap();
      console.log("Update result:", result);

      await refetch();

      message.success("Profile updated successfully");
      setIsEditing(false);
      setIsPhoneReadOnly(true);
      setProfileImageFile(null);
    } catch (error) {
      console.error("API Error:", error);
      message.error(error?.data?.message || "Error updating profile");
    }
  };

  const handleCancel = () => {
    setProfile({
      name: user?.data?.name || "",
      email: user?.data?.email || "",
      phone: user?.data?.phone || "",
    });

    setPreviewImage(
      user?.data?.profileImage ? `${baseURL}${user?.data?.profileImage}` :
        "https://i.ibb.co.com/fYrFP06M/images-1.png"
    );

    setProfileImageFile(null);
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-gray-50 p-2 sm:p-4 lg:p-6">
      <div className="w-full max-w-6xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-sm">

        {/* Header Section - Responsive Profile Image and Name */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">

          {/* Profile Image and Name Container */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 w-full sm:w-auto">

            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full border-2 border-primary mx-auto flex flex-col items-center relative">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={previewImage}
                    alt="Profile"
                    loading={getProfileLoading ? "lazy" : "eager"}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>

                {isEditing && (
                  <div className="absolute flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-2 text-center rounded-full cursor-pointer bg-[#FF991C] -bottom-1 -right-1 sm:bottom-1 sm:right-2">
                    <Upload
                      showUploadList={false}
                      onChange={handleFileChange}
                      beforeUpload={() => false}
                      accept="image/*"
                    >
                      <MdEdit className="text-sm sm:text-lg lg:text-xl text-white" />
                    </Upload>
                  </div>
                )}
              </div>
            </div>

            {/* Name Section */}
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-800 break-words">
                {profile.name || "User Name"}
              </h2>
              <p className="text-sm sm:text-base text-gray-500 mt-1 sm:hidden">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <Button
              type="text"
              icon={<EditOutlined />}
              className="border border-primary w-full sm:w-auto sm:min-w-[140px] lg:min-w-[150px] h-10 sm:h-10"
              onClick={() => {
                if (isEditing) {
                  handleCancel();
                } else {
                  setIsEditing(true);
                }
              }}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-4 sm:space-y-6">

          {/* Full Name Field */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-medium text-gray-600">
              Full Name
            </label>
            <Input
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="border rounded-lg border-primary h-10 sm:h-11 lg:h-12 text-sm sm:text-base"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-medium text-gray-600">
              Email
            </label>
            <Input
              name="email"
              type="email"
              readOnly
              value={profile.email}
              disabled
              className="border rounded-lg border-primary h-10 sm:h-11 lg:h-12 text-sm sm:text-base bg-gray-50"
              placeholder="Email address"
            />
          </div>

          {/* Contact Number Field */}
          <div className="space-y-2">
            <label className="block text-sm sm:text-base font-medium text-gray-600">
              Contact Number
            </label>
            <Input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={isPhoneReadOnly || !isEditing}
              className="border rounded-lg border-primary h-10 sm:h-11 lg:h-12 text-sm sm:text-base"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center sm:justify-end mt-6 sm:mt-8">
          <Button
            type="primary"
            loading={updateProfileLoading}
            icon={<SaveOutlined />}
            className="bg-primary w-full sm:w-auto sm:min-w-[180px] lg:min-w-[200px] h-10 sm:h-10 lg:h-10 text-sm sm:text-base"
            onClick={handleSave}
            disabled={!isEditing}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;