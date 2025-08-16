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
      // Make sure the field name matches what your backend expects
      formData.append("profileImage", profileImageFile);
    }

    try {
      const result = await updateProfile(formData).unwrap();
      console.log("Update result:", result); // Debug log

      // Refetch the user profile data to get the updated information
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
    // Reset to original values when canceling
    setProfile({
      name: user?.data?.name || "",
      email: user?.data?.email || "",
      phone: user?.data?.phone || "",
    });

    // Fixed the BaseURL reference (should be baseURL)
    setPreviewImage(
      user?.data?.profileImage ? `${baseURL}${user?.data?.profileImage}` :
        "https://i.ibb.co.com/fYrFP06M/images-1.png"
    );

    setProfileImageFile(null);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-start justify-center pt-5">
      <div className="rounded-xl w-full max-w-[800px]">
        <div className="flex items-end justify-between space-x-4">
          <div className="flex items-center gap-3">
            <div className="w-[140px] h-[140px] rounded-full border-2 border-primary mx-auto flex flex-col items-center relative">
              <div className="w-full h-full rounded-full">
                <img
                  src={previewImage}
                  alt="Profile"
                  loading={getProfileLoading}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              {isEditing && (
                <div className="absolute flex items-center justify-center w-8 h-8 p-2 text-center rounded-full cursor-pointer bg-[#FF991C] bottom-1 right-5">
                  <Upload
                    showUploadList={false}
                    onChange={handleFileChange}
                    beforeUpload={() => false} // Prevent auto upload
                    accept="image/*"
                  >
                    <MdEdit className="mt-1 text-xl text-white" />
                  </Upload>
                </div>
              )}
            </div>
            <h2 className="text-4xl font-semibold text-gray-800">
              {profile.name}
            </h2>
          </div>
          <Button
            type="text"
            icon={<EditOutlined />}
            className="mt-2 border border-primary w-[150px]"
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

        <div className="mt-6 space-y-4">
          <label className="block text-gray-600">Full Name</label>
          <Input
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="border rounded-lg border-primary p-2 h-[44px]"
          />

          <label className="block text-gray-600">Email</label>
          <Input
            name="email"
            type="email"
            readOnly
            value={profile.email}
            disabled
            className="border rounded-lg border-primary p-2 h-[44px]"
          />

          <label className="block text-gray-600">Contact Number</label>
          <Input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={isPhoneReadOnly || !isEditing}
            className="border rounded-lg border-primary p-2 h-[44px]"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            loading={updateProfileLoading}
            icon={<SaveOutlined />}
            className="mt-6 w-[200px] bg-primary"
            onClick={handleSave}
            disabled={!isEditing}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;