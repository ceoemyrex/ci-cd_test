/* eslint-disable @next/next/no-img-element */
import { Navbar, AppTag,Footer } from "@/components";

export default function Page() {
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
                  <AppTag title={"Terms"} />
                </div>
                <p className="font-bold text-center text-dark text-3xl lg:text-5xl leading-[120%]">
                  Terms and Conditions
                </p>

                {/* TERMS CONTENT */}
                <div className="text-sm mt-4 lg:mt-10 lg:text-lg space-y-8 text-grey">
                  {/* 1. Introduction */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">1. Introduction</p>
                    <p>
                      Welcome to Zinter BV! These Terms & Conditions govern your use of our services, including our website, logistics, and moving solutions. By using our services, you agree to comply with these terms. If you do not agree, please refrain from using our services.
                    </p>
                  </div>

                  {/* 2. Definitions */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">2. Definitions</p>
                    <p>
                     {` "Company,&quot; "we," "us," "our&quot; refers to Zinter BV, registered in the Netherlands.`}<br />
                      {`"Customer," "you" refers to any individual or business using our services`}.<br />
                      {`"Services" refers to our logistics, moving, and related solutions.`}
                    </p>
                  </div>

                  {/* 3. Use of Service */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">3. Use of Service</p>
                    <p>
                      You must be at least 18 years old or have legal authority to enter into agreements on behalf of an entity.<br />
                      You agree to provide accurate and complete information when using our services.<br />
                      You are responsible for securing any necessary permits or approvals required for your move.
                    </p>
                  </div>

                  {/* 4. Bookings and Payments */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">4. Bookings and Payments</p>
                    <p>
                      All bookings are subject to availability and confirmation.<br />
                      Payments must be made in full before service commencement unless otherwise agreed.<br />
                      Cancellation fees may apply if you cancel a booking within a specified period before the scheduled service.
                    </p>
                  </div>

                  {/* 5. Liability and Insurance */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">5. Liability and Insurance</p>
                    <p>
                      Zinter BV acts as a logistics platform and does not directly carry out the moving services. We connect customers with third-party moving service providers. As such, Zinter BV is not liable for any damages, delays, or losses incurred during the move.<br />
                      Any claims regarding damage, loss, or service issues should be directed to the third-party moving provider responsible for executing the move.<br />
                      We encourage customers to review the terms and insurance policies of the assigned moving service provider.<br />
                      Zinter BV may offer insurance options, and customers are encouraged to purchase additional coverage for high-value items.
                    </p>
                  </div>

                  {/* 6. Prohibited Items */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">6. Prohibited Items</p>
                    <div>
                      Customers must not include hazardous, illegal, or perishable items in their moving inventory. Prohibited items include but are not limited to:
                      <ul className="list-disc ml-6 mt-2">
                        <li>Flammable materials, explosives, or chemicals.</li>
                        <li>Illegal substances or contraband.</li>
                        <li>Perishable food items that could spoil during transportation.</li>
                      </ul>
                    </div>
                  </div>

                  {/* 7. Service Limitations */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">7. Service Limitations</p>
                    <p>
                      Zinter BV reserves the right to refuse service in cases where the requested move is unsafe, unlawful, or logistically unfeasible.<br />
                      We are not responsible for delays caused by factors beyond our control, including but not limited to weather conditions, traffic, or regulatory restrictions.
                    </p>
                  </div>

                  {/* 8. Intellectual Property */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">8. Intellectual Property</p>
                    <p>
                      All content on our website and materials related to our services are owned by Zinter BV.<br />
                      Unauthorized use, reproduction, or distribution of our materials is prohibited.
                    </p>
                  </div>

                  {/* 9. Amendments and Termination */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">9. Amendments and Termination</p>
                    <p>
                      We reserve the right to update these Terms & Conditions at any time.<br />
                      Continued use of our services after changes are made constitutes acceptance of the new terms.<br />
                      Zinter BV may terminate services if a customer violates these terms.
                    </p>
                  </div>

                  {/* 10. Governing Law & Dispute Resolution */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">10. Governing Law & Dispute Resolution</p>
                    <p>
                      These Terms & Conditions are governed by the laws of the Netherlands.<br />
                      Any disputes shall first be attempted to be resolved amicably. If unresolved, disputes will be handled through the appropriate legal channels in the Netherlands.
                    </p>
                  </div>

                  {/* 11. Contact Information */}
                  <div>
                    <p className="lg:text-2xl text-black font-medium">11. Contact Information</p>
                    <p>
                      For any inquiries regarding these Terms & Conditions, please contact us:<br />
                      <a href="mailto:support@zinter.nl" className="text-theme underline">support@zinter.nl</a>
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