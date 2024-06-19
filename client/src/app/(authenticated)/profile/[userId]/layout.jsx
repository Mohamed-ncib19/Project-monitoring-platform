'use client'
import { useRouter } from 'next/navigation';

const ProfileLayout = ({ children }) => {
  const { back } = useRouter();

  const handleGoBack = () => {
    back();
  };

  return (
    <div className="profile-layout-container">
      <div className="profile-header rounded-5 rounded-md-0 p-4 mb-5">
        <button
          onClick={handleGoBack}
          className="back fs-3 d-flex justify-content-center align-items-center text-white font-bold rounded-4 border-0 px-3"
        >
          <span><i class="bi bi-arrow-left"></i> Back</span>
        </button>
        <p className="text-center h1 mb-5 font-bold text-white">Profile</p>
      </div>
      <main className="profile-content">
        {children}
      </main>
    </div>
  );
};

export default ProfileLayout;
