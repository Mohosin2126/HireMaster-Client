import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../../LayOut/MainLayOut";
import Home from "../../Pages/Home/Home";
import SignUp from "../../Pages/SignUp/SignUp";
import Login from "../../Pages/Login/Login";
import Error from "../../Pages/Error/Error";
import Signup2 from "../../Pages/Signup2/Signup2";
import ManagerSignup from "../../Pages/Signup2/ManagerSignup";
import ManagerLogin from "../../Pages/Signup2/ManagerLogin";
import Jobs from "../../Pages/Jobs/Jobs";
import JobPost from "../../Pages/JobPost/JobPost";
import ContactUs from "../../Pages/ContactUs/ContactUs";
import About from "../../Pages/About/About";
import JobDetails from "../../Pages/JobDetails/JobDetails";
import Profile from "../../Pages/Profile/Profile";
import UserProfileForm from "../UserProfileForm/UserProfileForm";
import MyJobs from "../../Pages/Jobs/MyJobs";

import ProfileHead from "../../Pages/ProfileHead/ProfileHead";
import Education from "../../Pages/Education/Education";

import Appliedjobs from "../../Pages/Appliedjobs/Appliedjobs";
import PrivateRoute from "./PrivateRoute";
import ManagerProfile from "../../Pages/Profile/ManagerProfile";
import ManagerForm from "../../Pages/ManagerProfileForm/ManagerForm";
import MakePayment from "../MakePatment/MakePayment";

import Projects from "../../Pages/Projects/Projects";
import Experience from "../../Pages/Experience/Experience";
import Skills from "../../Pages/Skills/Skills";
import AdminDashboard from "../../AdminDashboard/AdminDashboard";
import AllUsers from "../../AdminDashboard/allUsers/allUsers";
import AllJobPost from "../../AdminDashboard/AllJobPost/AllJobPost";
import TechNews from "../../Pages/TechNews/TechNews";
import AdminTechNews from "../../AdminDashboard/AllTechNews/AdminTechNews";
import CreateNews from "../../AdminDashboard/CreateNews/CreateNews";
import UpdateNews from "../../AdminDashboard/UpdateNews/UpdateNews";
import NewsDetails from "../TechNews/NewsDetails";
import JobFair from "../../Pages/JobFair/JobFair";
import JobFairRegistrationForm from "../JobFair/JobFairRegistrationForm";
import JobFairProfile from "../../Pages/JobFair/JobFairProfile";
import FairProfileSettings from "../JobFair/FairProfileSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/jobs",
        element: (
          <PrivateRoute>
            <Jobs></Jobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/jobDetails/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobpost",
        element: (
          <PrivateRoute>
            <JobPost></JobPost>
          </PrivateRoute>
        ),
      },
      {
        path: "/appliedjobs/:email",
        element: (
          <PrivateRoute>
            <Appliedjobs></Appliedjobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/myPostedJobs",
        element: <MyJobs />,
      },
      {
        path: "contacts",
        element: <ContactUs />,
      },

      {
        path: "tech-news",
        element: <TechNews />,
      },
      {
        path: "tech-news/:slug",
        element: <NewsDetails />,
      },
      {
        path: "job-fair",
        element: (
          <PrivateRoute>
            <JobFair />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "job-fair/profile",
    element: <JobFairProfile />,
    children: [
      // {
      //   path: "profile",
      //   element:,
      // },
      {
        path: "settings",
        element: <FairProfileSettings />,
      },
    ],
  },
  {
    path: "job-fair/registration",
    element: <JobFairRegistrationForm />,
  },
  { path: "/signup", element: <SignUp></SignUp> },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/signup2",
    element: <Signup2></Signup2>,
  },
  {
    path: "/managersignup",
    element: <ManagerSignup></ManagerSignup>,
  },
  {
    path: "/managerlogin",
    element: <ManagerLogin></ManagerLogin>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "profile",
    element: <Profile></Profile>,
  },
  {
    path: "/MakePaymentRoute",
    element: <MakePayment></MakePayment>,
  },
  {
    path: "/managerProfile",
    element: (
      <PrivateRoute>
        <ManagerProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/managerForm",
    element: (
      <PrivateRoute>
        <ManagerForm />
      </PrivateRoute>
    ),
  },
  {
    path: "/profileForm",
    element: <UserProfileForm></UserProfileForm>,
  },
  {
    path: "/profileHead",
    element: <ProfileHead></ProfileHead>,
  },
  {
    path: "/education",
    element: <Education></Education>,
  },
  {
    path: "/projects",
    element: <Projects></Projects>,
  },
  {
    path: "/experience",
    element: <Experience></Experience>,
  },
  {
    path: "/skills",
    element: <Skills></Skills>,
  },
  // Admin Dashboard

  {
    path: "/AdminDashboard",
    element: <AdminDashboard></AdminDashboard>,
    children: [
      {
        path: "/AdminDashboard/AllUsers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/AdminDashboard/AllJobPost",
        element: <AllJobPost></AllJobPost>,
      },
      {
        path: "/AdminDashboard/create-news",
        element: <CreateNews />,
      },
      {
        path: "/AdminDashboard/all-news",
        element: <AdminTechNews />,
      },
      {
        path: "/AdminDashboard/all-news/:slug",
        element: <UpdateNews />,
      },
    ],
  },
]);

export default router;
