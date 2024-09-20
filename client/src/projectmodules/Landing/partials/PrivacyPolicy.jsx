import React from 'react';

function PrivacyPolicy() {
  return (
    <section className="bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-pink-700 mb-4 text-center">
          Privacy Policy & Terms of Use
        </h2>

        <h3 className="text-2xl font-semibold text-pink-600 mb-2">Privacy Policy</h3>
        <p className="text-gray-600 mb-4">
          This privacy notice for AfriCare ('we', 'us', or 'our'), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Visit our website at <a href="https://github.com/MrHackeric/AfriCare-Health" className="text-blue-600 underline">https://github.com/MrHackeric/AfriCare-Health</a>, or any website of ours that links to this privacy notice</li>
          <li>Engage with us in other related ways, including any sales, marketing, or events</li>
        </ul>
        <p className="text-gray-600 mb-4">
          Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:africare254@gmail.com" className="text-blue-600 underline">africare254@gmail.com</a>.
        </p>

        <h3 className="text-xl font-semibold text-pink-600 mb-2">Summary of Key Points</h3>
        <p className="text-gray-600 mb-4">
          This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents below.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>What personal information do we process?</li>
          <li>Do we process any sensitive personal information?</li>
          <li>Do we collect any information from third parties?</li>
          <li>How do we process your information?</li>
          <li>In what situations and with which parties do we share personal information?</li>
          <li>How do we keep your information safe?</li>
          <li>What are your rights?</li>
          <li>How do you exercise your rights?</li>
        </ul>

        <h3 className="text-2xl font-semibold text-pink-600 mb-2">Table of Contents</h3>
        <ol className="list-decimal list-inside text-gray-600 mb-4">
          <li>WHAT INFORMATION DO WE COLLECT?</li>
          <li>HOW DO WE PROCESS YOUR INFORMATION?</li>
          <li>WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</li>
          <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
          <li>DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</li>
          <li>HOW DO WE HANDLE YOUR SOCIAL LOGINS?</li>
          <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
          <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
          <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
          <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
          <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
          <li>DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?</li>
          <li>DO WE MAKE UPDATES TO THIS NOTICE?</li>
          <li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
          <li>HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</li>
        </ol>

        <h3 className="text-2xl font-semibold text-pink-600 mb-2">1. WHAT INFORMATION DO WE COLLECT?</h3>
        <p className="text-gray-600 mb-4">
          In Short: We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
        </p>
        <h4 className="text-xl font-semibold text-pink-500 mb-2">Personal Information Provided by You</h4>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Names</li>
          <li>Phone numbers</li>
          <li>Email addresses</li>
          <li>Usernames</li>
          <li>Passwords</li>
        </ul>
        <h4 className="text-xl font-semibold text-pink-500 mb-2">Sensitive Information</h4>
        <p className="text-gray-600 mb-4">
          When necessary, with your consent or as otherwise permitted by applicable law, we process sensitive information, including health data.
        </p>

        <h3 className="text-2xl font-semibold text-pink-600 mb-2">2. HOW DO WE PROCESS YOUR INFORMATION?</h3>
        <p className="text-gray-600 mb-4">
          We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
        </p>

        {/* Continue adding the remaining sections similarly */}

        <h3 className="text-2xl font-semibold text-pink-600 mb-2">14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
        <p className="text-gray-600 mb-4">
          If you have questions or comments about this notice, you may email us at <a href="mailto:africare254@gmail.com" className="text-blue-600 underline">africare254@gmail.com</a> or contact us by post at: AfriCare, EGERTON UNIVERSITY, NJORO, NAKURU 20100, Kenya.
        </p>

        <h3 className="text-2xl font-semibold text-pink-600 mb-2">15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h3>
        <p className="text-gray-600 mb-4">
          You have the right to request access to the personal information we collect from you, correct inaccuracies, or delete your personal information.
        </p>
      </div>
    </section>
  );
}

export default PrivacyPolicy;
