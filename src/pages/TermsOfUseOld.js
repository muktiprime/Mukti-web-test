import React, { useEffect } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Helmet } from "react-helmet";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ color: "white" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Mukti Prime - Terms of Use</title>
      </Helmet>
      <Header />
      <div style={styles.content}>
        <h2 style={styles.heading}>TERMS OF USE</h2>
        <hr style={styles.border} />
        <p>
          Mukti Prime provides you with a personal subscription service that
          allows the members of the platform to access Movies, TV shows, Short
          films, Crime shows….. and other available content on the Platform
          streamed over the internet connected devices.
        </p>
        <p>
          These Terms of Use govern your use of our services. As used in these
          Terms of Use, our service means to include the personalized services
          offered to you by Mukti Prime for watching all the content, including
          all the streaming features, recommendations and reviews, the Platform,
          and any other related software as associated with our service. These
          Terms of Use must also be read along with our Privacy Policy for
          clarity on the principles of privacy as applicable to you.
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Use of Our Services</h3>
        <p>
          Your membership with Mukti Prime will be valid until terminated. To
          use our services you will be required to be connected to the internet,
          and have a device which allows Mukti Prime to run on it, and while you
          may purchase of our services with our payment methods. Our payment
          methods are updated from time to time and may include payment services
          provided by third party.
        </p>

        <p>
          Along with our own subscription plans, we also might include special
          promotional plans or subscriptions provided by third parties in
          conjunction with the products and services of such other third
          parties. We are not responsible or anyway liable for the products and
          services provided by such third parties. Some of those offerings might
          have several conditions and limitations, which will be communicated to
          you at the time of your interaction with them. You will find specific
          details of your membership with us, on our Platform in your Account
          details.
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Payment and Termination</h3>
        <p>
          The membership fee for our service and any other charges you may incur
          in connection with your use of the service, such as taxes and other
          processing charges, will be charged on a monthly/ quarterly/ half
          yearly/ yearly basis your payment method on the calendar day
          corresponding with the commencement of your payment history.
        </p>
        <p>
          We may change our subscription plans and the price of our service from
          time to time; however, any price changes or changes to our
          subscription plans will apply to you no earlier than with the
          provision of a notice to you.
        </p>

        <p>
          To use our services you must provide one or more Payment Methods. You
          can update your Payment Methods by going to the "Account" page. We may
          also update your Payment Methods using information provided by the
          payment service providers. Following any update, you authorize us to
          continue to charge the applicable Payment Method(s). You authorize us
          to charge any Payment Method associated to your account in case your
          primary Payment Method is declined or no longer available to us for
          payment of your subscription fee. You remain responsible for any
          uncollected amounts. If a payment is not successfully settled, due to
          expiration, insufficient funds, or otherwise, and you do not cancel
          your account, we may suspend your access to the service until we have
          successfully charged a valid Payment Method. For some Payment Methods,
          the issuer may charge you certain fees with additional transactional
          costs, such has to be checked with your Payment Method service
          provider for details.
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Cancellation</h3>
        <p>
          Unless you have cancelled your membership, you authorize us to charge
          your subsequent month’s membership fee to your Payment method, where
          you have opted in for auto renewal.
        </p>
        <p>
          You can cancel your membership at any point of time, and you will
          continue to have access to our services through to the end of your
          monthly billing period. You can go to your “Account” page and follow
          further instructions to cancel subscription to our services. If you
          cancel your subscription, it will come to an end automatically at the
          end of the billing period. In the event, where you have used third
          party services to create an account with us, or use our services, you
          will have to check your settings on such third party services to
          ensure that your subscription is cancelled.
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Refund</h3>
        <p>
          Payments are non-refundable and we do not provide refunds or credit
          for any partial month subscription periods or unwatched content. While
          you can cancel the subscription at any time, you will continue to have
          access to the service through the end of your billing validity period.
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Our Services</h3>
        <p>
          You must be 18 years of age, or the age of majority in your province,
          territory or country, to become a member of our service. Minors may
          only use the service under the strict supervision of an adult.
        </p>
        <p>
          Our service and any content viewed through the service are for your
          personal and non-commercial use only and may not be shared with
          individuals beyond your household. During our membership we grant you
          a limited, non-exclusive, non-transferable right to access the service
          and view the streaming content. Except for the foregoing, no right,
          title or interest shall be transferred to you. You agree not to use
          the service for public performances.
        </p>
        <p>
          You may view our content primarily within the country in which you
          have established your account and only in geographic locations where
          we offer our service and have licensed such content. The content that
          may be available to watch will vary by geographic location and will
          change from time to time.
        </p>

        <p>
          You agree to use our service, including all features and
          functionalities associated therewith, in accordance with all
          applicable laws, rules and regulations, or other restrictions on use
          of the service or content therein. You agree not to archive,
          reproduce, distribute, modify, display, perform, publish, license,
          create derivative works from, offer for sale, or use (except as
          explicitly authorized in these Terms of Use) content and information
          contained on or obtained from or through our service. You also agree
          not to: circumvent, remove, alter, deactivate, degrade or thwart any
          of the content protections in our service; use any robot, spider,
          scraper or other automated means to access our service; decompile,
          reverse engineer or disassemble any software or other products or
          processes accessible through the our service; insert any code or
          product or manipulate the content of our service in any way; or use
          any data mining, data gathering or extraction method. In addition, you
          agree not to upload, post, e-mail or otherwise send or transmit any
          material designed to interrupt, destroy or limit the functionality of
          any computer software or hardware or telecommunications equipment
          associated with our service, including any software viruses or any
          other computer code, files or programs. We may terminate or restrict
          your use of our service if you violate these Terms of Use or are
          engaged in illegal or fraudulent use of the service.
        </p>

        <p>
          The quality of the display of the streaming content may vary from
          device to device, and may be affected by a variety of factors, such as
          your location, the bandwidth available through and/or speed of your
          Internet connection. HD, Ultra HD and HDR availability is subject to
          your Internet service and device capabilities. Not all content is
          available in all formats, such as HD, Ultra HD or HDR and not all
          subscription plans allow you to receive content in all formats. Please
          check with your Internet provider for information on possible Internet
          data usage charges. The time it takes to begin watching the streaming
          content will vary based on a number of factors, including your
          location, available bandwidth at the time, the content you have
          selected and the configuration of your device.
        </p>

        <p>
          Mukti Prime is developed and is designed to enable viewing of the
          streaming content through various internet connected devices. This
          software may vary by device and medium, and functionalities and
          features may also differ between devices. You acknowledge that the use
          of the service may require third party software that is subject to
          third party licenses. You agree that you may automatically receive
          updated versions of the Platform and related third-party software.
        </p>

        <p>
          The member who created the Account with us, and to whom the Payment
          method is related to, shall at all times be considered the owner of
          the account with us. Such person is responsible for activity that
          occurs through their account with us. To maintain control over the
          account and to prevent anyone from accessing the account (which would
          include information on viewing history for the account), the Account
          Owner should maintain control over their Platform connected devices
          that are used to access the service and not reveal the password or
          details of the Payment Method associated with the account to anyone.
          You are responsible for updating and maintaining the accuracy of the
          information you provide to us relating to your account. We can
          terminate your account or place your account on hold in order to
          protect you, us or our partners from identity theft or other
          fraudulent activity.
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Warranty</h3>
        <p>
          Our service is provided “as is” and is without warranty or condition.
          In particular, our service may not at all times be uninterrupted or
          error free. You waive all special, indirect and consequential damages
          against us. These terms will not limit any non-waivable warranties or
          consumer protection rights that you may be entitled to under the laws
          of your country of residence.
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Law</h3>
        <p>
          These Terms of Use shall be governed by and interpreted in accordance
          with the laws of India. To find more information about our service and
          its features or if you need assistance with your account, please visit
          the Help Centre on our website. In the event of any conflict between
          these Terms of Use and information provided by Customer Support or
          other portions of our website, these Terms of Use will control.
        </p>

        <hr style={styles.border} />
        <h3 style={styles.gap}>Changes to Terms of Use</h3>
        <p>
          We may from time to time change our Terms of Use. To check the most
          updated Terms of Use, please visit
          https://muktiprime.com/terms-of-use. We may assign or transfer our
          agreement with you including our associated rights and obligations at
          any time and you agree to cooperate with us at such times of
          assignment or transfer.
        </p>

        <p>
          If any provision or provisions of these Terms of Use shall be held to
          be invalid, illegal, or unenforceable, the validity, legality and
          enforceability of the remaining provisions shall remain in full force
          and effect.
        </p>

        <p>
          We will send you information relating to your account (e.g. payment
          authorizations, invoices, changes in password or Payment Method,
          confirmation messages, notices) in electronic form only, for example
          via emails to your email address provided during registration.
        </p>
      </div>

      <Footer />
    </div>
  );
};

const styles = {
  content: {
    margin: "25pt",
  },
  heading: {
    textAlign: "center",
  },
  border: {
    marginTop: "30px",
    borderTop: "1px solid #fff",
  },
  gap: {
    marginTop: "30px",
    marginBottom: "25px",
  },
  ul: {
    listStyleType: "square",
    marginLeft: "27px",
  },
};
export default TermsOfUse;
