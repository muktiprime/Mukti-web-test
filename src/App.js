import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./Home";
import activePlan from "./pages/active-plan";
import changePassword from "./pages/change-password";
import fail from "./pages/fail";
import forgotPassword from "./pages/forgot-password";
// import help from "./pages/help";
import login from "./pages/login";
// import manageProfile from "./pages/manage-profile";
// import newProfile from "./pages/new-profile";
import success from "./pages/success";
import profileUpdate from "./pages/profile-update";
import transaction from "./pages/transaction";
import watchlist from "./pages/watchlist";
import resetPassword from "./pages/reset-password";
// import menuId from "./pages/menuid";
import plans from "./pages/plans";
import categorySlug from "./pages/categorySlug";
import ContentSlug from "./pages/contentSlug";
import Player from "./pages/Player";
import BillingDetails from "./pages/billing/BillingDetails";
import Billing from "./pages/billing/Billing";
import Payment from "./pages/Payment";
import Search from "./pages/search";
import GlobalContext from "./context_api";
import Signup from "./pages/Signup";
import EmailVerification from "./pages/emailVerification";
import emailVerified from "./pages/emailVerified";
import Preference from "./components/Preference/Preference";
import CloseAccount from "./components/CloseAccount/CloseAccount";
import useraccount from "./pages/useraccount";
import VerifyEmail from "./pages/verifyEmail";
import { createBrowserHistory } from "history";
import SetNewPassword from "./pages/SetNewPassword";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import RefundPolicy from "./pages/RefundPolicy";
import AppDownload from "./pages/app";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { WS_HOST_URL } from "./config";
// import { useEffect } from "react";
import { LastLocationProvider } from 'react-router-last-location';
import Faq from "./pages/faq";
import GrievanceRedressalMechanism from "./pages/grievance-redressal-mechanism";

function App() {
	const history = createBrowserHistory();
	//   const user = localStorage.getItem("user", null);
	// if (user){
	// 	const ws = new WebSocket(`${WS_HOST_URL}/ws/device/${user}/`);
	// 	ws.onopen = (event) => {
	// 		console.log("WebSocket Connection Open...", event);
	// 	};
	// 	ws.onmessage = (event) => {
	// 		console.log("WebSocket Message Received...", event.data);
	// 		const data = JSON.parse(event.data);
	// 		console.log("-->", data);
	// 	};
	// 	ws.onerror = (event) => {
	// 		console.log("WebSocket Error Occurred...", event);
	// 	};
	// 	ws.onclose = (event) => {
	// 		console.log("WebSocket Connection Closed...", event);
	// 	};
	// }

	return (
		<GlobalContext history={history}>
			<Router history={history}>
				<LastLocationProvider>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login" component={login} />
						<Route exact path="/app" component={AppDownload} />
						<Route exact path="/faq" component={Faq} />
						<Route exact path="/grievance-redressal-mechanism" component={GrievanceRedressalMechanism} />
						<Route
							exact
							path="/emailverification/:id"
							component={EmailVerification}
						/>
						<Route exact path="/search" component={Search} />

						<ProtectedRoute path="/account/active-plan" component={activePlan} />
						<ProtectedRoute
							path="/account/change-password"
							component={changePassword}
						/>
						<Route path="/fail" component={fail} />
						<Route path="/forgot-password" component={forgotPassword} />
						{/* <Route path="/help" component={help} /> */}
						<ProtectedRoute
							path="/settings/close-account"
							component={CloseAccount}
						/>

						<ProtectedRoute path="/settings/preferences" component={Preference} />
						{/* <ProtectedRoute path="/manage-profile" component={manageProfile} /> */}
						{/* <ProtectedRoute path="/new-profile" component={newProfile} /> */}
						<ProtectedRoute path="/success" component={success} />
						<ProtectedRoute path="/account/transaction" component={transaction} />
						<ProtectedRoute
							path="/account/profile-update"
							component={profileUpdate}
						/>
						<ProtectedRoute path="/watchlist" component={watchlist} />
						<Route path="/reset-password" component={resetPassword} />
						<ProtectedRoute
							path="/account/user-account"
							component={useraccount}
						/>
						<Route
							path="/category/:category/:category_slug"
							component={categorySlug}
						/>
						<Route
							path="/content/:content/:content_slug"
							component={ContentSlug}
						/>
						<Route path="/plans" component={plans} />
						<ProtectedRoute path="/player/:type/:player" component={Player} />
						<ProtectedRoute path="/billing-details" component={BillingDetails} />
						<ProtectedRoute path="/billing" component={Billing} />
						<ProtectedRoute path="/plan/:payment" component={Payment} />
						<Route exact path="/email-verified" component={emailVerified} />

						<Route exact path="/refund-policy" component={RefundPolicy} />
						<Route exact path="/privacy-policy" component={PrivacyPolicy} />
						<Route exact path="/terms-of-use" component={TermsOfUse} />
						<Route exact path="/about-us" component={AboutUs} />
						<Route exact path="/contact-us" component={ContactUs} />

						<Route path="/account/verify/email" component={VerifyEmail} />
						<Route
							path="/account/password/reset/:id/:token"
							component={SetNewPassword}
						/>
						<Route exact path="/:id" component={Home} />
					</Switch>
				</LastLocationProvider>
			</Router>
		</GlobalContext>
	);
}

export default App;
