/* eslint-disable @next/next/no-img-element */
import { Navbar, AppTag,Footer } from "@/components";

export default function PrivacyPolicyPage() {
  return (
    <>
      <section>
        <div className="relative pb-15 lg:pb-30 lg:rounded-t-4xl">
          <img
            src={"/hero-bg.png"}
            alt="hero-bg"
            className="absolute lg:rounded-t-4xl top-0 left-0 w-full h-full object-center object-cover"
          />
          <div className="relative max-w-310 mx-auto p-4 lg:py-10 lg:p-10">
            <Navbar />
            <div className="pt-12 max-w-250 mx-auto lg:pt-26.25">
              <div className="space-y-4 mt-12">
                <div className="text-center">
                  <AppTag title={"Privacy"} />
                </div>
                <p className="font-bold text-center text-dark text-3xl lg:text-5xl leading-[120%]">
                  Privacy Policy
                </p>

                {/* PRIVACY CONTENT */}
                <div className="text-sm mt-4 lg:mt-10 lg:text-lg space-y-8 text-grey">

                  {/* 1. Introduction */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">1. Introduction</p>
                    <p>
                      Zinter BV {`("we," "us," or "our")`} is a logistics tech company specializing in moving services. Zinter BV is registered in the Netherlands. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy & Cookies Statement explains how we collect, use, and protect your data when you use our services, including our website and any associated platforms.
                    </p>
                  </div>

                  {/* 2. Information We Collect */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">2. Information We Collect</p>
                    <p className="font-medium mt-2">a. Personal Data</p>
                    <ul className="list-disc ml-6 mt-1 space-y-1">
                      <li><strong>Identity & Contact Data:</strong> Name, phone number, email address, home/office address.</li>
                      <li><strong>Moving Details:</strong> Pick-up and drop-off locations, type and volume of goods, preferred moving dates.</li>
                      <li><strong>Billing & Payment Data:</strong> Payment method details, transaction history.</li>
                      <li><strong>Customer Support Data:</strong> Communications and queries related to your bookings or service requests.</li>
                    </ul>

                    <p className="font-medium mt-4">b. Technical & Usage Data</p>
                    <ul className="list-disc ml-6 mt-1 space-y-1">
                      <li><strong>Device Information:</strong> IP address, browser type, operating system.</li>
                      <li><strong>Usage Data:</strong> Interactions with our platform, page visits, service preferences.</li>
                      <li><strong>Cookies & Tracking Technologies:</strong> Information collected via cookies and analytics tools.</li>
                    </ul>
                  </div>

                  {/* 3. How We Use Your Information */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">3. How We Use Your Information</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Process and fulfill moving service requests.</li>
                      <li>Communicate updates regarding your bookings.</li>
                      <li>Improve our services through analytics and feedback.</li>
                      <li>Ensure the security and functionality of our platform.</li>
                      <li>Comply with legal and regulatory requirements.</li>
                    </ul>
                  </div>

                  {/* 4. How We Share Your Information */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">4. How We Share Your Information</p>
                    <p>
                      We do not sell your personal data. However, we may share it with:
                    </p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li><strong>Service Providers:</strong> Third-party logistics partners and moving contractors.</li>
                      <li><strong>Payment Processors:</strong> To facilitate transactions securely.</li>
                      <li><strong>Legal Authorities:</strong> If required by law or in response to legal requests.</li>
                    </ul>
                  </div>

                  {/* 5. Data Security and Retention */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">5. Data Security and Retention</p>
                    <p>
                      We implement security measures to protect your data from unauthorized access and breaches. Your data is retained only for as long as necessary to fulfill the purpose of collection or comply with legal obligations.
                    </p>
                  </div>

                  {/* 6. Your Rights & Choices */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">6. Your Rights & Choices</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li>Access, update, or delete your personal data.</li>
                      <li>Object to processing or request data portability.</li>
                      <li>Withdraw consent for marketing communications.</li>
                      <li>Adjust cookie settings via your browser.</li>
                    </ul>
                    <p className="mt-2">
                      To exercise your rights, contact us at <a href="mailto:privacy@zinter.nl" className="text-theme underline">privacy@zinter.nl</a>.
                    </p>
                  </div>

                  {/* 7. Cookies Policy */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">7. Cookies Policy</p>
                    <p>
                      Zinter BV uses cookies to enhance user experience and analyze platform performance. You can manage your cookie preferences through your browser settings.
                    </p>
                  </div>

                  {/* 8. Types of Cookies We Use */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">8. Types of Cookies We Use</p>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                      <li><strong>Essential Cookies:</strong> Necessary for website functionality.</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand user behavior.</li>
                      <li><strong>Marketing Cookies:</strong> Personalize ads and offers.</li>
                    </ul>
                  </div>

                  {/* 9. Updates to This Statement */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">9. Updates to This Statement</p>
                    <p>
                      We may update this policy from time to time. Any changes will be communicated on our website.
                    </p>
                  </div>

                  {/* 10. Contact Information */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">10. Contact Information</p>
                    <p>
                      For any inquiries regarding this Privacy Policy, please contact us: <br />
                      <a href="mailto:privacy@zinter.nl" className="text-theme underline">privacy@zinter.nl</a>
                    </p>
                  </div>

                </div>
              </div>
            </div>

            <div className="space-y-4 mt-20 max-w-200 mx-auto lg:mt-40"></div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}